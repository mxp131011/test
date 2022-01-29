<template>
    <div ref="BubblePopupsRef" style="position: fixed; top: 0; left: 0" :style="{ zIndex }">
        <template v-if="baseData.showArrows">
            <Transition :name="baseData.transition">
                <div
                    v-show="baseData.showPopup"
                    class="popups"
                    :style="{ top: baseData.popupsTop, left: baseData.popupsLeft, width: width + 'px', height: newHeight }"
                >
                    <span
                        v-if="baseData.showArrows"
                        class="arrows"
                        :class="baseData.dynPlace"
                        :style="{
                            width: baseData.arrowsSize + 'px',
                            height: baseData.arrowsSize + 'px',
                            top: baseData.arrowsTop,
                            background,
                            left: baseData.arrowsLeft
                        }"
                    ></span>

                    <div class="view" :style="{ width: width + 'px', height: newHeight, background, padding: +`${baseData.padding / 2}px 0px` }">
                        <slot></slot>
                    </div>
                </div>
            </Transition>
        </template>
        <template v-else>
            <el-dialog v-model="baseData.showPopup" :width="width" :showClose="false" customClass="popups-dialog">
                <template #footer>
                    <div class="view" :style="{ width: width + 'px', height: `calc(${newHeight} - ${baseData.padding}px)` }">
                        <slot></slot>
                    </div>
                </template>
            </el-dialog>
        </template>
    </div>
</template>

<script setup>
    import { watch, ref, shallowReactive, computed, shallowRef, inject } from 'vue';
    import { useViewStore } from '@/store/modules/view.js';
    const emit = defineEmits(['change']);
    const props = defineProps({
        zIndex: { type: Number, default: 10 }, //  zIndex
        background: { type: String, default: '#fff' }, // 背景
        autoClose: { type: Boolean, default: true }, // 是否自动关闭
        placement: { type: String, default: 'default' }, // 位置可取值 default top-start top-end bottom-start bottom-end
        width: { type: Number, default: 300 },
        height: { type: Number, default: 420 }
    });
    const viewStore = useViewStore();
    const BubblePopupsRef = ref(null);
    const baseData = shallowReactive({
        dialogVisible: false,
        showArrows: true,
        transition: 'el-zoom-in-top',
        target: false,
        popupsTop: '0px',
        popupsLeft: '0px',
        arrowsSize: 10,
        arrowsTop: '0px',
        arrowsLeft: '0px',
        showPopup: false,
        dynPlace: '',
        padding: 12
    });

    watch(
        () => [props.height, viewStore.mainHeight, viewStore.mainWidth],
        () => {
            baseData.target && baseData.showPopup && getPopupsPosition(baseData.target);
        }
    );
    const newHeight = computed(() => props.height + baseData.padding + 'px');

    /**
     *得到Popups弹出位置
     */
    function getPopupsPosition(target) {
        const { transition, placement, x, y, arrowsTop, arrowsLeft } = getPlacement(target);
        baseData.dynPlace = props.placement === 'default' ? placement : props.placement;
        baseData.transition = transition;
        baseData.popupsTop = `${y}px`;
        baseData.popupsLeft = `${x}px`;
        baseData.arrowsTop = `${arrowsTop}px`;
        baseData.arrowsLeft = `${arrowsLeft}px`;
    }

    /**
     *得到布局
     */
    function getPlacement(target) {
        baseData.showArrows = true;
        const margin = 12;
        // 屏幕宽高
        const pageWidth = document.body.clientWidth;
        const pageHeight = document.body.clientHeight;
        // 点击dom宽高
        const targetWidth = target.offsetWidth;
        const targetHeight = target.offsetHeight;
        // 点击dom右上角的坐标
        const targeX = target.getBoundingClientRect().left;
        const targeY = target.getBoundingClientRect().top;
        // 点击dom中心点坐标
        const centerX = targeX + parseInt(targetWidth / 2);
        const centerY = targeY + parseInt(targetHeight / 2);

        // 半径
        const arrowsRadius = baseData.arrowsSize / 2;

        const mar = 12;
        // 下面足够
        const bottomEnough = Boolean(targeY + targetHeight + margin + props.height + mar < pageHeight);
        // 上面足够
        const topEnough = Boolean(props.height + margin + mar < targeY);
        // 左面足够
        const rightEnough = Boolean(targeX + targetWidth + margin + props.width + mar < pageWidth);
        // 右面足够
        const leftEnough = Boolean(targeX - props.width - margin >= mar);
        if ((bottomEnough || topEnough) && pageWidth > props.width + mar * 2) {
            // 上或者下足够并且宽度也足够
            const y = parseInt(bottomEnough ? targeY + targetHeight + margin : targeY - margin - props.height);
            const rightX = parseInt(centerX - props.width / 2);
            const leftX = parseInt(centerX + props.width / 2);
            const transition = bottomEnough ? 'el-zoom-in-top' : 'el-zoom-in-bottom';
            const placement = bottomEnough ? 'top' : 'bottom';
            let x = mar;

            if (rightX >= mar && pageWidth - leftX >= mar) {
                x = rightX;
            } else if (pageWidth - leftX >= mar) {
                x = mar;
            } else if (rightX >= mar) {
                x = pageWidth - props.width - mar;
            }
            const arrowsTop = bottomEnough ? -arrowsRadius : props.height + baseData.padding - arrowsRadius;
            const arrowsLeft = centerX - x;
            return { transition, placement, x, y, arrowsTop, arrowsLeft };
        } else if ((leftEnough || rightEnough) && pageHeight > props.height + mar * 2) {
            // 左或者右足够并且高度也足够
            const x = parseInt(leftEnough ? targeX - props.width - margin : targeX + targetWidth + margin);
            const topY = parseInt(centerY - props.height / 2);
            const bottomY = parseInt(centerY + props.height / 2);
            const placement = leftEnough ? 'left' : 'right';
            let y = mar;
            if (topY >= mar && pageHeight - bottomY >= mar) {
                // 水平居中
                y = topY;
            } else if (pageHeight - bottomY >= mar) {
                y = mar;
            } else {
                y = pageHeight - props.height - mar;
            }
            const arrowsTop = centerY - y;
            const arrowsLeft = leftEnough ? props.width - arrowsRadius : -arrowsRadius;
            return { transition: 'el-fade-in', placement, x, y, arrowsTop, arrowsLeft };
        } else {
            baseData.showArrows = false;
            const y = parseInt(centerY + targetHeight / 2 + margin);
            return { transition: 'el-zoom-in-top', placement: 'top', x: 0, y };
        }
    }

    // (父弹出框是否关闭) 这里监听全局点击事件（用于关闭气泡弹出框）
    const isFatherBubble = inject('is-father-bubble', shallowRef(false));
    const documentMousedownEvent = (event) => {
        const bT = baseData.target;
        const eT = event.target;
        const myRef = BubblePopupsRef.value || false;
        if (!props.autoClose || isFatherBubble.value || bT.contains(eT) || bT === eT || !myRef || myRef.contains(eT)) {
            return;
        }
        hide();
    };

    /**
     *
     * @param {target} target  传入 target
     * @param {boolean} isHide 再次点击是否关闭，第一次点击显示，第二次点击隐藏
     */
    const show = (target, isHide = true) => {
        const _show = () => {
            baseData.target = target;
            baseData.showPopup && hide();
            getPopupsPosition(target);
            baseData.showPopup = true;
            props.autoClose && document.addEventListener('mousedown', documentMousedownEvent);
        };
        if (baseData.target !== target) {
            _show();
        } else if (isHide) {
            baseData.showPopup ? hide() : _show();
        } else {
            _show();
        }
    };
    function hide() {
        baseData.showPopup = false;
        document.removeEventListener('mousedown', documentMousedownEvent);
    }

    // 键盘事件
    const _documentKeydownEvent = (event) => {
        if (!props.autoClose && (event.code === 'Escape' || event.keyCode === 27) && !isFatherBubble.value) {
            baseData.showPopup = false;
            event.stopPropagation && event.stopPropagation();
            event.preventDefault && event.preventDefault();
        }
    };

    watch(
        () => baseData.showPopup,
        (val) => {
            emit('change', val);
            if (val) {
                document.body.addEventListener('keydown', _documentKeydownEvent);
            } else {
                document.body.removeEventListener('keydown', _documentKeydownEvent);
            }
        }
    );
    defineExpose({ hide, show });
</script>

<style lang="scss" scoped src="./BubblePopups.scss"></style>
