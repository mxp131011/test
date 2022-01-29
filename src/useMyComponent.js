/* eslint-disable vue/component-definition-name-casing */
import BasicInput from '@/components/BasicElement/BasicInput/BasicInput.vue';
import IconButton from '@/components/Unclassified/IconText/IconButton.vue';
import IconText from '@/components/Unclassified/IconText/IconText.vue';
import BubblePopups from '@/components/Unclassified/BubblePopups/BubblePopups.vue';

/**
 *  注册全局组件
 *
 */
export function useMyComponent(app) {
    app.component('BubblePopups', BubblePopups);
    app.component('BasicInput', BasicInput);
    app.component('IconButton', IconButton);
    app.component('IconText', IconText);
}
