<template>
    <div>
        <div class="special-ps5-quiz-body">
            <div class="special-ps5-quiz-body__wrapper">
                <icon-base class="special-ps5-quiz-body__icon"
                    icon-name='icon-quote'
                    width="43" height="33"
                    viewBox="0 0 43 33">
                    <icon-quote></icon-quote>
                </icon-base>
                <div class="special-ps5-quiz-body__container">

                    <Quote v-for="(hints, index) in data.hints"
                        :key="index + 1"
                        :data="hints"
                        v-show="index + 1 === quoteIndex"
                        :isUserPickAnswer="isUserPickAnswer"/>

                    <div v-if="isUserPickAnswer" class="special-ps5-quiz-body__buttons">
                        <div :class="['special-ps5-quiz-body__button',
                            {'is-correct': this.isCorrectAnswer},
                            {'is-wrong': !this.isCorrectAnswer}]">
                                {{this.isCorrectAnswer ? 'Верно!' : 'Неверно :('}}
                        </div>
                        <div class="special-ps5-quiz-body__button special-ps5-quiz-body__button--next"
                            v-show='questionIndex <= 7'
                            @click="nextQuestion">{{this.questionIndex === 7 ? 'Завершить тест' : 'Следующая игра'}}
                        </div>
                    </div>

                    <div v-if="!isUserPickAnswer" class="special-ps5-quiz-body__footer">
                        <div class="special-ps5-quiz-navigate">
                            <HintNav v-for="(hints, index) in data.hints"
                                @show-previous-hint="backToQuote"
                                :key="index"
                                :quoteIndex="quoteIndex"
                                :questionIndex="questionIndex"
                                :index='index + 1'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="special-ps5-quiz__options">
            <QuizBlock
                v-for="(option, index) in data.options"
                :key="index"
                :option="option"
                @send-click="checkResult"
                :picked="picked"
                :isPicked="isPicked"
                :isUserPickAnswer="isUserPickAnswer"
                :isCorrectAnswer="isCorrectAnswer"
                :isWrongAnswer="isWrongAnswer"
                :isShowCorrect="isShowCorrect"/>
        </div>
    </div>
</template>

<script>
import * as Analytics from '../lib/analytics';
import Quote from './Quote.vue';
import QuizBlock from './QuizBlock.vue';
import IconBase from './IconBase.vue';
import IconQuote from './Icons/IconQuote.vue';
import HintNav from './HintNav.vue';

export default {
  name: 'Question',
  components: {
    Quote,
    QuizBlock,
    IconBase,
    IconQuote,
    HintNav,
  },
  props: {
    data: {
      type: Object,
    },
    questionIndex: {
      type: Number,
    },
  },
  data() {
    return {
      score: 0,
      quoteIndex: 1, // counter подсказок
      openQuoteIndex: 1,
      disabledButton: false,
      picked: null,
      isUserPickAnswer: null,
      isCorrectAnswer: null,
      isPicked: null,
      isWrongAnswer: null,
      isShowCorrect: null,
    };
  },
  methods: {
    nextHint() {
      if (this.quoteIndex <= 1) {
        this.quoteIndex += 1;
      } else {
        this.quoteIndex += 1;
        this.disabledButton = true;
      }
    },
    nextQuestion() {
      this.clearState();
      this.$emit('next-question');
      Analytics.sendEvent('Next', this.questionIndex);
    },

    checkResult(picked, isCorrect) {
      this.picked = picked;
      this.isCorrectAnswer = isCorrect;

      this.changeButtonState();

      if (picked && !isCorrect) {
        this.isWrongAnswer = true;
      }

      if (isCorrect) {
        this.score += 1;

        this.$emit('get-score', this.score);
      }
    },
    backToQuote(hintIndex) {
      this.quoteIndex = hintIndex;
    },
    changeButtonState() {
      this.isUserPickAnswer = true;
      this.isPicked = true;
      this.isShowCorrect = true;
    },
    clearState() {
      this.quoteIndex = 1; // сбрасываем counter подсказок
      this.openQuoteIndex = 1;
      this.picked = '';
      this.isUserPickAnswer = null;
      this.isCorrectAnswer = null;
      this.isPicked = null;
      this.isWrongAnswer = null;
      this.isShowCorrect = null;
      this.disabledButton = false;
      this.unlocked = false;
    },
  },
};
</script>

<style lang="stylus">
.special-ps5-quiz-body
    position: relative;
    font-size: 16px;
    line-height: 22px;
    padding: 30px;
    background #ffffff
    border-radius: 10px;
    filter: drop-shadow(0px 3px 6px #8CC0E3);
    @media (max-width: 520px)
      padding: 20px;
    @media (max-width: 320px)
      padding: 20px 10px;
    &__container
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 220px;
        @media (max-width: 520px)
          min-height: 240px;
    &__buttons
        display flex
        flex-direction row
        justify-content space-between
    &__button
        background: #FFFFFF;
        border: 1px solid #4DA0DA;
        box-sizing: border-box;
        border-radius: 5px;
        line-height: 38px;
        text-align center
        cursor pointer
        transition: box-shadow 0.2s, background .2s;
        padding: 0 25px;
        color: #000000
        &:hover
          background: #4DA0DA;
          box-shadow: 0px 3px 6px #8CC0E3;
          color: #ffffff
          @media (max-width: 520px)
            box-shadow: none;
            background: #FFFFFF;
            color: #000000
        @media (max-width: 520px)
          font-size: 13px;
          padding: 0 15px;
        &.is-correct
            background: #EEFBF3;
            color: #07A23B;
            border: none;
            pointer-events none
        &.is-wrong
            pointer-events none
            background: #FFF1F1;
            color: #CD192E;
            border: none;

    &__icon
        position: absolute;
        left: 30px;
        top: 38px;
        @media (max-width: 520px)
          left: 15px;
          top: 26px;
        @media (max-width: 390px)
          left: 15px;
          top: 28px;

          width: 24px;
          height 20px;
    &__footer
        display flex
        flex-direction row
    &__next
        border: 1px solid #4DA0DA;
        box-sizing: border-box;
        border-radius: 5px;
        width: 100%;

.special-ps5-quiz-navigate
    display flex
    flex-direction row
</style>
