<template>
  <div id="app">
    <v-app id="inspire">
      <div class="myrecipe-page">
        <v-container class="myrecipe-container d-flex-row">
          <div class="myrecipe-head-wrap">
            <div class="d-flex justify-space-between pb-3">
              <div>
                <v-icon @click="moveMypage">mdi-window-close</v-icon>
              </div>

              <div style="font-size: x-large">히스토리</div>
              <div>
                <v-icon>mdi-blank</v-icon>
              </div>
            </div>
          </div>
          <v-divider></v-divider>

          <!-- <div :page="currentPage" :items="myRecipes" :items-per-page="perPage" class="text-center"> -->
          <div v-if="recipeList.length > 0">
            <div v-for="(mr, i) in recipeList" :key="i">
              <v-list-item three-line>
                <v-list-item-avatar class="recipe-item" tile size="100">
                  <v-img :src="mr.repImg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-space-between">
                    <div class="recipe-item">
                      <div class="d-flex align-center">
                        <v-icon small color="letcipe"
                          >mdi-calendar-clock</v-icon
                        >
                        <div style="font-size: medium">
                          {{ mr.regTime }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <v-icon
                        style="z-index: 1"
                        small
                        color="info"
                        @click="openDialog(mr)"
                        >mdi-pencil</v-icon
                      >
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle class="recipe-item">
                    <div class="d-flex justify-space-between">
                      <v-list-item-subtitle class="d-flex align-center">
                        <div class="d-flex align-center">
                          {{ mr.title }}
                        </div>
                      </v-list-item-subtitle>
                      <v-btn
                        style="z-index: 1"
                        small
                        color="letcipe"
                        @click="addAll(mr)"
                        v-on="on"
                        >+전체담기</v-btn
                      >
                    </div>
                  </v-list-item-subtitle>

                  <div>
                    <v-list-item-subtitle
                      class="d-flex justify-end"
                      style="text-align: left"
                    >
                      <div>
                        <v-icon v-if="!mr.isShow" @click="showRecipes(mr)"
                          >mdi-chevron-down</v-icon
                        >
                        <v-icon v-else @click="hideRecipes(mr)"
                          >mdi-chevron-up</v-icon
                        >
                      </div>
                    </v-list-item-subtitle>
                    <!-- <v-list-item-subtitle style="text-align: right">
                      <v-icon v-if="!isShow" @click="showRecipes"
                        >mdi-chevron-down</v-icon
                      >
                      <v-icon v-else @click="hideRecipes"
                        >mdi-chevron-up</v-icon
                      >
                    </v-list-item-subtitle> -->
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <div v-if="mr.isShow">
                <v-card-title
                  class="justify-center"
                  style="background-color: white; color: #7cb342"
                  >포함된 레시피 목록</v-card-title
                >
                <v-divider></v-divider>
                <div v-for="(recipeInfo, idx) in mr.items" :key="idx">
                  <v-list-item three-line style="background-color: white">
                    <v-list-item-avatar
                      tile
                      size="100"
                      @click="moveDetail(recipeInfo)"
                    >
                      <v-img :src="recipeInfo.recipe.repImg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <div class="d-flex justify-space-between align-center">
                        <v-list-item-title @click="moveDetail(recipeInfo)">{{
                          recipeInfo.recipe.title
                        }}</v-list-item-title>

                        <v-btn
                          style="z-index: 1"
                          small
                          color="letcipe"
                          @click="addCart(recipeInfo.recipe)"
                          >+담기</v-btn
                        >
                      </div>

                      <v-list-item-subtitle @click="moveDetail(recipeInfo)">{{
                        recipeInfo.recipe.content
                      }}</v-list-item-subtitle>
                      <div class="d-flex justify-space-between">
                        <v-list-item-subtitle style="margin: auto 0">
                          <v-icon small color="pink lighten-1"
                            >mdi-cards-heart</v-icon
                          >
                          {{ recipeInfo.recipe.recipeLike }}
                        </v-list-item-subtitle>

                        <v-list-item-subtitle style="text-align: right">
                          수량&nbsp;&nbsp;:&nbsp;&nbsp;
                          <span style="color: black; font-size: 1.2rem">{{
                            recipeInfo.amount
                          }}</span
                          >&nbsp;&nbsp;개
                        </v-list-item-subtitle>

                        <!-- <v-list-item-title style="text-align: right">
                      11개</v-list-item-title
                      >-->
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
                <v-divider></v-divider>
                <v-card-title
                  class="justify-center"
                  style="background-color: white"
                  ><v-icon medium color="letcipe">mdi-calendar-clock</v-icon>
                  <div style="font-size: medium">
                    {{ mr.regTime }} 일의 기록
                  </div></v-card-title
                >
                <div
                  v-if="historyList[i].review !== null"
                  class="d-flex align-center"
                >
                  <v-text-field
                    prepend-inner-icon="mdi-comment"
                    filled
                    rounded
                    disabled
                    :value="historyList[i].review"
                  ></v-text-field>
                </div>
                <div v-else class="d-flex justify-center mt-2 mb-2">
                  {{ mr.regTime }}일의 리뷰를 남겨주세요!
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <v-list-item three-line>완료된 목록이 없습니다.</v-list-item>
              <v-divider></v-divider>
            </div>
          </div>
          <v-pagination
            v-model="currentPage"
            color="letcipe"
            :length="TotalPage"
            :per-page="perPage"
            :total-visivle="TotalPage"
            circle
          ></v-pagination>
        </v-container>
        <div>
          <v-row class="justify-center pa-8">
            <v-dialog v-model="dialog4" max-width="290">
              <v-card>
                <v-icon
                  @click="
                    () => {
                      dialog4 = false
                    }
                  "
                  >mdi-window-close</v-icon
                >
                <v-card-title style="font-size: xx-large">REVIEW</v-card-title>
                <v-card-text class="text--primary">
                  <div class="d-flex align-center">
                    <v-icon small color="letcipe">mdi-calendar-clock</v-icon>
                    <div style="font-size: medium">
                      {{ history.regTime }} 일의 기록
                    </div>
                  </div>
                  <v-textarea
                    v-model="history.review"
                    name="input-7-4"
                    placeholder="내용을 입력해주세요"
                    solo
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="letcipe"
                    text
                    @click=";[(dialog4 = false), modify(history)]"
                    >확인</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-icon
                  @click="
                    () => {
                      dialog = false
                    }
                  "
                  >mdi-window-close</v-icon
                >
                <v-card-title style="font-size: xx-large"
                  >REVIEW 수정</v-card-title
                >
                <v-card-text class="text--primary">
                  <div class="d-flex align-center">
                    <v-icon small color="letcipe">mdi-calendar-clock</v-icon>
                    <div style="font-size: medium">
                      {{ history.regTime }} 일의 기록
                    </div>
                  </div>
                  <v-textarea
                    v-model="history.review"
                    name="input-7-4"
                    placeholder="내용을 입력해주세요"
                    clearable
                    solo
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="letcipe"
                    text
                    @click=";[(dialog = false), modify(history)]"
                    >확인</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>

        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          style="z-index: 100; margin-bottom: 60px"
        >
          {{
            reviewModifySuccess
              ? '리뷰 수정에 성공했습니다'
              : '리뷰 수정에 실패했습니다'
          }}
        </v-snackbar>

        <v-snackbar
          v-model="snackbar2"
          :timeout="timeout"
          style="z-index: 100; margin-bottom: 60px"
        >
          {{
            isSucceededtoCart
              ? '모두 담기에 성공했습니다'
              : '모두 담기에 실패했습니다'
          }}
        </v-snackbar>
        <v-snackbar
          v-model="snackbar3"
          :timeout="timeout"
          style="z-index: 100; margin-bottom: 60px"
        >
          {{ text }}
        </v-snackbar>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'MyHistoryPage',
  data() {
    return {
      TotalPage: 0,
      perPage: 5,
      currentPage: 1,
      byname: '',
      searchedName: '',
      dialogSameIngre: false,
      byRecipe: true,
      scroll: 0,
      scrollTarget: '',
      isLoading: false,
      items: [],
      keyword: '',
      search: null,
      tab: null,
      isSelected: [],
      selectedIngre: '',
      recipeList: [],
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog4: false,
      history: '',
      timeout: 2000,
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
    }
  },
  computed: {
    ...mapState('user', ['myRecipe']),
    ...mapState('history', ['historyList', 'reviewModifySuccess']),
    ...mapState('cart', ['isSucceededtoCart']),
  },

  watch: {},

  created() {
    const pageable = {
      page: 0,
    }
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(async () => {
      await this.getHistoryList(pageable)
      this.historyList?.forEach((mr) => {
        if (mr.process === 'END') {
          const myHistory = {
            id: mr.id,
            regTime: mr.regTime.split('T')[0],
            review: mr.review,
            repImg: mr.historyItems[0].recipe.repImg,
            title:
              mr.historyItems[0].recipe.title + ' 외 ' + mr.historyItems.length,
            items: mr.historyItems,
            isShow: false,
          }
          this.recipeList.push(myHistory)
        }
      })
    })
  },
  methods: {
    ...mapActions('recipe', ['patchRecipeDetail']),
    ...mapActions('history', [
      'getHistoryList',
      'createReview',
      'modifyReview',
    ]),
    ...mapActions('user', ['myrecipe']),
    ...mapActions('cart', ['createCart']),
    ...mapMutations('recipe', ['SET_RECIPE_ID', 'CLEAR_RECIPE_ID']),
    writeReview(mr) {
      const review = {
        historyId: mr.id,
        review: mr.review,
      }
      // console.log(review)
      this.createReview(review)
    },
    modify(mr) {
      const review = {
        historyId: mr.id,
        review: mr.review,
      }
      this.modifyReview(review)
      this.snackbar = true
    },
    moveDetail(mr) {
      this.CLEAR_RECIPE_ID()
      this.SET_RECIPE_ID(mr.recipe.id)
      // console.log(mr)
      this.$router.push('/recipe/detail')
    },
    moveMypage() {
      this.$router.push('/user/mypage')
    },
    addCart(recipe) {
      // console.log(recipe.id)
      const cartItem = [recipe.id]
      const list = { cartItem }
      this.createCart(list)
      this.text = '레시피 한개 담기에 성공했습니다.'
      this.snackbar3 = true
    },
    addAll(mr) {
      const recipeList = []
      mr.items.forEach((i) => {
        const id = i.recipe.id
        recipeList.push(id)
      })
      const addrecipes = {
        list: recipeList,
      }
      this.createCart(addrecipes)
      this.snackbar2 = true
    },
    showRecipes(mr) {
      mr.isShow = true
    },
    hideRecipes(mr) {
      mr.isShow = false
    },
    openDialog(mr) {
      this.history = mr
      if (this.history.review) {
        this.dialog = true
      } else {
        this.dialog4 = true
      }
    },
  },
}
</script>

<style scoped>
.myrecipe-page {
  /* padding-top: 70px; */
  padding-bottom: 70px;
  padding: 4%;
}
.myrecipe-page-head {
  padding: 4%;
  box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.2);
  /* border: 1px solid gray; */
}
.myrecipe-container {
  position: sticky;
  height: 100%;
  color: black;

  box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.2);
}
.recipe-item {
  cursor: pointer;
}
:deep(.v-input__icon.v-input__icon--append) {
  display: none;
}
:deep(.v-text-field__details) {
  display: none;
}
</style>
