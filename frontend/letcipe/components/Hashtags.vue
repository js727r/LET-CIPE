<template>
  <div ref="group" class="comp_hashtag" @click="setHashtags">
    <p v-if="helpVisible" class="help">{{ defaultPlaceholder }}</p>

    <!-- Hashtags -->
    <div v-if="!helpVisible" class="tags">
      <input
        ref="fake"
        type="text"
        class="fake"
        @keydown.backspace.prevent="deleteTag(focusIndex)"
        @keydown.delete.prevent="deleteTag(focusIndex)"
      />
      <span v-for="(row, index) in tags" :key="index" class="tag active">
        {{ row.value
        }}
        <v-icon size="small" color="white" @click="deleteTag(index)">mdi-close</v-icon>
      </span>
    </div>
    <!--// Hashtags -->

    <div v-show="!helpVisible" class="inp mt-1">
      <input
        ref="input"
        v-model.trim="value"
        placeholder="태그입력"
        type="text"
        @focus="initSelect"
        @keydown.space.prevent="addHashTags"
        @keydown.enter.prevent="addHashTags"
        @keydown.backspace="initErrorMsg"
        @keydown.delete="initErrorMsg"
      />
    </div>

    <transition
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <p v-if="errorMsg" class="noti">{{ errorMsg }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HashTags',

  data() {
    return {
      defaultPlaceholder: this.placeholder
        ? this.placeholder
        : '#추천태그 #특수문자제외',
      errorMsg: null,
      focusIndex: null,
      helpVisible: true,
      tags: [],
      value: '',
    }
  },
  methods: {
    setVisible() {
      return (this.helpVisible = false)
    },
    async setHashtags() {
      if (this.tags.length > 0) {
        return
      }

      const result = await this.setVisible()

      if (!result) this.$refs.input.focus()
    },

    addTag() {
      this.tags.push({ value: this.value, select: false })
      this.$emit('setTags', this.tags)
      return true
    },
    unselectTag() {
      this.tags.forEach((tag) => (tag.select = false))
    },
    selectTag(idx) {
      if (this.tags.some((tag) => tag.select)) {
        this.unselectTag()
      }

      this.tags[idx].select = !this.tags[idx].select

      if (!this.tags[idx].select) {
        this.initSelectIndex()
        return
      }

      this.$refs.fake.focus()
      this.focusIndex = idx
    },
    deleteTag(idx) {
      if (idx === null) {
        return
      }

      this.initSelectIndex()
      this.tags.splice(idx, 1)
    },

    initSelect() {
      if (!this.tags.some((tag) => tag.select)) {
        return
      }

      this.unselectTag()
      this.initSelectIndex()
    },
    initSelectIndex() {
      this.focusIndex = null
    },
    initErrorMsg() {
      this.errorMsg = null
    },
    validate() {
      if (this.tags.some((tag) => tag.value === this.value)) {
        return '중복된 단어를 입력하셨습니다.'
      }

      const regex = /[~!@#$%^&*()+|<>?:{},.="':;/-]/
      if (regex.test(this.value)) {
        return '특수문자는 태그로 등록할 수 없습니다.'
      }

      return false
    },
    async addHashTags(event) {
      // CASE 공백
      if (event.target.value === '') {
        this.initErrorMsg()
        event.target.focus()
        return
      }
      // CASE 유효성(중복,특문)
      const resultMsg = await this.validate()
      if (resultMsg) {
        this.errorMsg = resultMsg
        this.$refs.input.focus()
        return
      }

      await this.addTag()

      this.errorMsg = null
      this.value = null
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'LeeSeoyun';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff')
    format('woff');
  font-weight: bold;
  font-style: normal;
}
* {
  font-family: 'LeeSeoyun';
}
.comp_hashtag {
  position: relative;
  width: 100%;
  padding: 3px;
  border: 1px solid black;
  border-radius: 4px;
  min-height: 40px;
  margin: 0px auto;
  text-align: left;
  box-sizing: border-box;

  .noti {
    position: absolute;
    left: 0;
    top: 100%;
    font-size: 12px;
    margin-top: 5px;
    padding: 0 5px;
    border-radius: 4px;
    border: 1px solid #ea2136;
    color: #ea2136;
    text-align: left;
    line-height: 2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .help {
    padding: 0;
    margin: 0;
    line-height: 30px;
    font-weight: 300;
    font-size: 14px;
    color: white;
    vertical-align: middle;
  }

  .tags {
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: -6px;

    .fake {
      position: absolute;
      width: 1px;
      height: 1px;
      left: -1px;
      right: -1px;
      padding: 0;
      border: 0;
      outline: none;
      -webkit-appearance: none;
      -webkit-text-size-adjust: none;
    }
    .tag {
      display: inline-block;
      position: relative;
      margin: 0;
      padding: 0 5px;
      line-height: 30px;
      border-radius: 5px solid black;

      vertical-align: middle;
      word-wrap: break-word;
      word-break: break-all;
      font-size: 13px;
      text-align: left;
      &:hover:after {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid black;
        content: '';
        border-radius: 5px;
      }

      &:before {
        display: inline;
        content: '#';
      }

      &.active {
        background-color: #656565;
        color: #fff;
        &:hover:after {
          display: none;
        }
      }
    }
  }

  .inp {
    display: inline-block;
    overflow: hidden;
    height: 30px;
    width: 150px;
    vertical-align: middle;
    font-family: 'LeeSeoyun';

    &:before {
      display: inline;
      position: relative;
      top: -1px;
      content: '#';
      color: #3e3e3e;
      margin-right: 2px;
      vertical-align: middle;
      line-height: 30px;
    }

    input {
      width: 135px;
      height: 28px;
      vertical-align: middle;
      color: #3e3e3e;
      -webkit-appearance: none;
      -webkit-text-size-adjust: none;
      padding: 0;
      border: 0;
      outline: none;
      font-family: 'LeeSeoyun';
    }
  }
}
</style>
