<template>
    <el-input
        ref="elInputRef"
        v-model="baseData.newValue"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :type="type"
        :size="size"
        :step="step"
        :resize="resize"
        :rows="rows"
        :label="label"
        :inputStyle="inputStyle"
        :validateEvent="validateEvent"
        :autosize="autosize"
        :clearable="clearable"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :prefixIcon="prefixIcon"
        :suffixIcon="suffixIcon"
        :max="max"
        :min="min"
        @blur="blurEvent"
        @focus="focusEvent"
        @change="changeEvent"
        @input="inputEvent"
        @clear="clearEvent"
        @keydown.enter="confirmEvent"
    >
        <template v-if="$slots.prepend" #prepend>
            <slot name="prepend"></slot>
        </template>
        <template v-if="$slots.prefix" #prefix>
            <slot name="prefix"></slot>
        </template>
        <template v-if="$slots.suffix" #suffix>
            <slot name="suffix"></slot>
        </template>

        <template v-if="$slots.append" #append>
            <slot name="append"></slot>
        </template>
    </el-input>
</template>

<script setup>
    import { ref, shallowReactive, watchEffect } from 'vue';
    const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'change', 'input', 'clear', 'confirm']);
    const props = defineProps({
        modelValue: { type: [String, Number], default: '' }, // 默认值
        inputStyle: { type: [Object, Array], default: () => [] }, // input元素或textarea元素的style
        validateEvent: { type: Boolean, default: false }, // 输入时是否触发表单的校验
        label: { type: String, default: '' }, // 输入框关联的label文字
        size: { type: String, default: 'small' }, // 输入框尺寸，只在 type!="textarea" 时有效   large / default / small
        prefixIcon: { type: [String, Object], default: '' }, // 输入框头部图标
        suffixIcon: { type: [String, Object], default: '' }, // 输入框尾部图标
        rows: { type: Number, default: 2 }, // 输入框行数，只对 type="textarea" 有效
        autosize: { type: [Boolean, Object], default: false }, // 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
        maxlength: { type: Number, default: 140 },
        clearable: { type: Boolean, default: true }, // 是否显示删除按钮
        type: { type: String, default: 'text' }, // text，textarea 和其他 原生 input 的 type 值
        placeholder: { type: String, default: '请输入' }, // 输入框占位文本
        autocomplete: { type: String, default: 'off' }, // 原生属性，自动补全
        disabled: { type: Boolean, default: false }, // 原生属性
        readonly: { type: Boolean, default: false }, // 原生属性，是否只读
        max: { type: [Number, Boolean], default: false }, // 原生属性，设置最大值
        min: { type: [Number, Boolean], default: false }, // 原生属性，设置最小值
        step: { type: Number, default: 1 }, // 原生属性，设置输入字段的合法数字间隔
        resize: { type: String, default: 'none' }, // 控制是否能被用户缩放 //none, both, horizontal, vertical
        autofocus: { type: Boolean, default: false } // 原生属性，自动获取焦点
    });
    const baseData = shallowReactive({
        newValue: props.modelValue || ''
    });
    watchEffect(() => {
        baseData.newValue = props.modelValue;
    });

    /**
     * 得到焦点
     */
    function focusEvent(event) {
        emit('focus', event);
    }

    /**
     * 失去焦点
     */
    function blurEvent(event) {
        emit('blur', event);
    }
    function changeEvent(value) {
        emit('change', value);
    }
    function inputEvent(value) {
        emit('input', value);
        emit('update:modelValue', value);
    }
    function clearEvent() {
        emit('clear', '');
    }
    function confirmEvent() {
        emit('confirm', baseData.newValue);
    }

    /**
     * 设置搜索框聚焦
     */
    const elInputRef = ref(null);
    function setFocus() {
        elInputRef.value.focus();
    }
    defineExpose({ focus: setFocus });
</script>
