<template>
    <div v-if="visible" class="dialog">
        <div class="dialog-content">
            <h2>这是一个对话框</h2>
            <button @click="close">关闭</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    visible: Boolean
})
const emit = defineEmits(['update:visible'])

const close = () => {
    emit('update:visible', false)
}
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
    background: white;
    padding: 20px;
    margin: 100px auto;
    width: 200px;
}
</style>
