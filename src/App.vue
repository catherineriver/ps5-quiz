<template>
  <div :class="[
          'special-ps5-quiz',
          `special-ps5-quiz--${$store.state.params.location}`,
          {'special-ps5-quiz--result': isShowResult && isFullPage},
          {'l-mb-28': !isFullPage },
          {'l-island-round': !isFullPage },
       ]"
       v-observe-visibility="{
           callback: visibilityChanged,
           once: true,
       }">
    <div class="special-ps5-quiz__container l-island-a">
      <div class="special-ps5-quiz__header" v-if="!isShowResult">
        <div class="special-ps5-quiz__title">Угадайте игру по трём цитатам из рецензий</div>
        <div class="special-ps5-quiz__counter">{{questionIndex + 1}} из {{data.questions.length}}</div>
      </div>
      <Question
        v-if="!isShowResult"
        :data="data.questions[questionIndex]"
        :questionIndex="questionIndex + 1"
        @next-question="nextQuestion"
        @get-score="getScore"
        />
      <Result v-if="isShowResult" :data="data.results[this.score]" :score="this.score"/>
    </div>
    <Promo @show-more="showMore" v-if="isShowResult" :isFullPage="isFullPage"/>
  </div>
</template>

<script>
import * as Analytics from './lib/analytics';
import { preloadImages } from './lib/helper';
import data from './data/data';
import Question from './components/Question.vue';
import Result from './components/Result.vue';
import Promo from './components/Promo.vue';

export default {
  name: 'App',
  components: {
    Question,
    Result,
    Promo,
  },
  data() {
    return {
      data,
      score: 0,
      questionIndex: 0,
      isFullPage: false,
      isCorrectAnswer: null,
      isPicked: null,
      isShowResult: false,
      isShowMore: false,
    };
  },
  mounted() {
    if (this.$store.state.params.location === 'full') {
      this.isFullPage = true;
    }
    preloadImages([
      'https://leonardo.osnova.io/3b9feb7b-b580-5334-a421-e9315e9c7742/',
      'https://leonardo.osnova.io/9ccfebcd-9b4b-5b1a-8427-e5bcaedfab66/',
      'https://leonardo.osnova.io/82489743-44ca-51e7-b359-8bfa69d2ae2d/',
      'https://leonardo.osnova.io/00f7a128-fb28-5583-84dc-e73083095aed/',
    ]);
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible) {
        Analytics.sendEvent('Project', 'in-viewport');
      }
    },
    nextQuestion() {
      if (this.questionIndex < 6) {
        this.isPicked = null;
        this.questionIndex += 1;
      } else {
        this.isShowResult = true;
      }
    },
    getScore(score) {
      this.score = score;
    },
    showMore() {
      this.isShowMore = true;
    },
  },
};
</script>

<style lang="stylus">
.special-ps5-quiz
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative
  z-index: 99
  max-width: 100%
  font-family: 'Roboto', sans-serif
  font-size: 16px
  line-height: normal
  text-size-adjust: 100%
  background-color: transparent
  overflow: hidden
  border-radius: 8px;

  & *
  & *:before
  & *:after
    box-sizing: border-box

  & svg
    display block
    fill currentColor
    pointer-events none

  & b
    font-weight: 700
  & img
    display block
    width 100%

  & button
    margin: 0
    padding: 0
    font-family: inherit
    user-select: none
    outline: none
    box-shadow: none
    appearance: none
    cursor: pointer

  &__container
    width: 640px
    max-width: 100%
    margin: 0 auto
    padding: 20px;

    background: #D9F5FF;

    overflow hidden

    @media (max-width: 520px)
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 0;
      padding-right: 0;
  &__header
    display flex
    flex-direction row
    justify-content space-between
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    margin-bottom 18px;
  &__counter
    color: #4DA0DA;
    flex-shrink: 0;
  &__options
    min-height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    margin-top: 20px;
    &.is-disabled
      cursor none
      pointer-events none
    @media (max-width: 520px)
      flex-direction: row;
      margin: 10px 0;
  &__title
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
    flex-grow: 1;
    @media (max-width: 520px)
      line-height: 28px;
      max-width 250px;

    // styles for full page
.special-ps5-quiz--full
  & .special-ps5-quiz-result__title
    font-weight: bold;
    font-size: 32px;
    line-height: 28px;
    @media(max-width: 520px)
      font-size: 26px;
      line-height: 28px;
  & .special-ps5-quiz-result__score
    font-weight: bold;
    font-size: 64px;
    line-height 48px;
    margin-top: 17px;
    margin-bottom: 23px;
    @media(max-width: 520px)
      font-size: 26px;
      line-height: 28px;
      margin 0;

  @media(min-width: 1020px)
    & .special-ps5-quiz__title, .special-ps5-quiz__counter
      font-weight: bold;
      font-size: 32px;
      line-height: 22px;
    & .special-ps5-quiz__header
      margin-bottom 24px;
    & .special-ps5-quiz-body__container
      min-height 220px;
    & > .special-ps5-quiz__container
      width 1020px
      padding: 30px 40px
    & .special-ps5-quiz-answer
      font-size: 20px;
      height: 67px;
    & .special-ps5-quiz-promo__desc
      max-width: 330px;
    & .special-ps5-quiz-promo__bg
      margin: 20px 0 20px 0;
    & .special-ps5-quiz-more
      position: absolute;
      top: 20px;
      background: #fff;
      border-radius: 8px;
      padding: 0 20px;

      max-width: 560px;
      max-height: 480px;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index 10
      & > .special-ps5-quiz-more__content
        font-size: 14px;
        line-height 24px;
        font-weight: 400;
        margin: 20px 0;
        max-width: 461px;
    & .special-ps5-quiz-navigate__item
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 26px;
      line-height: 30px;
      & svg
        width: 15px
        height 20px;
    & .special-ps5-quiz-quote
      font-size: 24px;
      line-height: 34px;
    & .special-ps5-quiz-answer.is-picked.is-disabled.is-wrong:before,
      .special-ps5-quiz-answer.is-disabled.is-correct:before
      width: 28px;
      height: 28px;

      left: 20px;
  & .special-ps5-quiz-body__button
    line-height 50px;
    font-size: 20px;
  @media (max-width: 1020px)
    & .special-ps5-quiz-body__button
      font-size: 16px;
      line-height: 38px;
      height: 40px;
      padding: 0 20px 0 20px;
  @media (max-width: 520px)
    & .special-ps5-quiz-quote
      font-size: 16px;
    & .special-ps5-quiz-body__button
      font-size: 14px;
    & .special-ps5-quiz__container
      padding-left: 16px;
      padding-right: 16px;
  @media (max-width: 320px)
    & .special-ps5-quiz-body__button
      line-height 38px;
      font-size: 12px;


.special-ps5-quiz--result
  @media(min-width: 1020px)
    display flex
    flex-direction row
    min-height: 550px;
    & .special-ps5-quiz-promo__button
      font-size: 20px;
      padding: 0 32px;
      line-height: 50px;
    & .special-ps5-quiz-promo__logo
      margin-bottom: 26px;

    & .special-ps5-quiz-promo
      padding: 30px 40px;
    & .special-ps5-quiz__container
      max-width 380px;
    & .special-ps5-quiz__container--promo
      max-width: 640px;
    & .special-ps5-quiz-result
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height 100%
      margin-top: 0
      &__score
        order: 3
      &__title
        order: 2;

      &__image
        position absolute
        flex-grow: 1;
        order: 1
        top: -40px;
        left: -40px;
        max-width: 534px;
      & > .likely
        order: 4;

</style>
