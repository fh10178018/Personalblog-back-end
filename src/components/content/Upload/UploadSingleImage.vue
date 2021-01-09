<template>
  <div class="upload-image-header"
       :class="headerClass"
       v-if="placeholder">{{placeholder}}(图片大小应该为 {{size[0]}} x {{size[1]}} px)</div>
  <div class="upload-image-wrap"
       :style="showStyle"
       @click="input.click()">
    <span role="button">
      <input type="file"
             name="files"
             @change="handleChange"
             v-show="false"
             ref="input"
             accept>
      <img v-if="nativeImageUrl"
           :src="'/api'+nativeImageUrl">
      <i v-else
         class="fa fa-plus"></i>
    </span>

  </div>

</template>

<script>
import { computed, ref, toRefs, unref } from 'vue'
import { useEmitter } from '@/utils/emmiter'
import { postFile } from 'http/index'
export default {
  name: 'UploadSingleImage',
  props: {
    maxSize: {
      type: Number,
      default: 2
    },
    size: {
      type: Array,
      default: () => [150, 150]
    },
    reqCnt: { /* 最大请求并发量，在created赋值给maxLen */
      default: 4,
      validator: val => {
        return val > 0 && val <= 6
      }
    },
    fileTypes: {
      type: Array,
      default: () => ['img', 'png', 'jpeg']
    },
    placeholder: {
      type: String,
      default: ''
    },
    description: String,
    actions: String,
    modelValue: String
  },
  setup (props, { emit }) {
    const { maxSize, fileTypes, size, modelValue, description } = toRefs(props)
    const input = ref(null)
    const loading = ref(false)
    const { dispatch } = useEmitter()
    const nativeImageUrl = computed(() => unref(modelValue))
    const nativeDescription = computed(() => unref(description))
    const showStyle = computed(() => {
      return {
        width: unref(size)[0] + 'px',
        height: unref(size)[1] + 'px'
      }
    })
    const headerClass = computed(() => ([unref(modelValue) ? 'checkisactive' : '']))
    const handleChange = (el) => {
      const files = filterFiles([...el.target.files], unref(fileTypes), unref(maxSize))// 过滤
      if (!files) return
      imageUpload(files[0])
    }
    const imageUpload = (file) => {
      loading.value = true
      return postFile('/imagefile/uploadSingleImage', 'imageFile', file, unref(nativeDescription)).then(_res => {
        loading.value = false
        dispatch('FormItem', 'form-change', _res.imageUrl)
        emit('update:modelValue', _res.imageUrl)
      }).catch(_err => {
        loading.value = false
      })
    }
    return {
      input,
      handleChange,
      showStyle,
      nativeImageUrl,
      headerClass,
      ...toRefs(props)
    }
  }

}
// 过滤不符合条件的文件
function filterFiles (files, fileTypes, maxSize) {
  return files.filter(file => {
    const index = file.name.lastIndexOf('.')
    let ext = file.name.slice(index + 1).toLowerCase()
    // 处理jepg各种格式
    if (['jfif', 'pjpeg', 'jepg', 'pjp', 'jpg'].includes(ext)) { ext = 'jpeg' }
    if (fileTypes.includes(ext) && file.size <= maxSize * 1024 * 1024) {
      return true
    } else {
      return false
    }
  })
}

</script>

<style  lang="less">
.upload-image-wrap {
  width: 128px;
  height: 128px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s;
  transition: border-color 0.3s;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.upload-image-header {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  color: var(--light-color);
}
</style>
