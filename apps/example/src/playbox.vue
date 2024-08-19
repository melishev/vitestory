<script setup lang="ts">
import { onMounted, ref } from 'vue';

const refContainer = ref<HTMLElement | null>()
const refIframe = ref<HTMLIFrameElement | null>()

function createIframe() {
  if (refIframe.value) {
    refIframe.value.remove()
  }
  
  const iframe = document.createElement('iframe')
  iframe.style.width = '100%';
  iframe.style.height = '300px';
  iframe.style.border = '1px solid red';

  refIframe.value = iframe

  if (!refContainer.value) return
  refContainer.value.appendChild(refIframe.value)
}

function updateIframe(version: 2 | 3, template, data) {
  createIframe()

  if (!refIframe.value) return
  const doc = refIframe.value.contentDocument || refIframe.value.contentWindow?.document;

  doc.open();
  if (version === 2) {
    doc.write(`
      <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.min.js"><\/script>
      </head>
      <body>
        ${template}
        <script>
          new Vue({
            el: '#app',
            name: 'test v.2',
            data: ${JSON.stringify(data)}
          });
          Vue.config.devtools = true;
        <\/script>
      </body>
      </html>
    `);
  } else {
    doc.write(`
      <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/vue@3.4.38/dist/vue.global.min.js"><\/script>
      </head>
      <body>
        ${template}
        <script>
          const { createApp } = Vue

          createApp({ name: 'test v.3', setup() { return ${JSON.stringify(data)} }}).mount('#app')
        <\/script>
      </body>
      </html>
    `);
  }
  doc.close();
}

onMounted(() => {
  createIframe()
})
</script>

<template>
  <button @click="updateIframe(2, '<div id=&quot;app&quot;><h1>{{ title }}</h1><p>{{ message }}</p></div>', { title: 'Hello Vue 2!', message: '2.7.16' })">VUE 2</button>
  <button @click="updateIframe(3, '<div id=&quot;app&quot;><h1>{{ title }}</h1><p>{{ message }}</p></div>', { title: 'Hello Vue 3!', message: '3.4.38'})">VUE 3</button>
  <br />
  <br />
  <div ref="refContainer" />
</template>