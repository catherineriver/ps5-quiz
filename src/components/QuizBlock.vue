<template>
      <div :class="[
    'special-ps5-quiz-answer',
    {'is-picked': picked === option.name },
    {'is-disabled': isUserPickAnswer},
    {'is-correct': option.correct},
    {'is-wrong': !option.correct && picked}]"
    @click="sendClick(option.name, option.correct)">
         {{option.name}}
      </div>
</template>

<script>

export default {
  name: 'QuizBlock',
  data() {
    return {

    };
  },
  components: {
  },
  props: {
    option: {
      type: Object,
    },
    isCorrectAnswer: {
      type: Boolean,
    },
    isUserPickAnswer: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
    isWrongAnswer: {
      type: Boolean,
    },
    isPicked: {
      type: Boolean,
    },
    picked: {
      type: String,
    },
  },
  computed: {
  },
  methods: {
    sendClick(picked, isCorrect) {
      this.$emit('send-click', picked, isCorrect);
    },
  },
  mounted() {
  },

};
</script>

<style lang="stylus">
.special-ps5-quiz-answer
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-basis: 50%;

  position: relative;

  background: transparent;
  color: #000;

  border: 1px solid #4DA0DA;
  box-sizing: border-box;
  border-radius: 5px;

  width: 100%;
  max-width: calc(50% - 5px)
  height 40px

  padding: 0 20px 0 20px;
  margin: 5px 0;

  transition background .2s ease, box-shadow 0.2s;
  cursor pointer
  &:hover
    background: #4DA0DA;
    box-shadow: 0px 3px 6px #8CC0E3;
    color: #ffffff
    @media (max-width: 768px)
      background: transparent;
      box-shadow: none;
      color: #000;

  &:nth-child(even)
      margin-left: 10px;
  &.is-disabled
    pointer-events none;
    background transparent
    color: #000;
  &.is-picked
    box-shadow: 0px 3px 6px #8CC0E3;
    background #ffffff
    border: none;
    color: #000;
  &.is-picked.is-disabled.is-wrong
    background #ffffff
    color: #000;
    border: none;
  &.is-picked.is-disabled.is-wrong:before
    content: ''
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 17'%3E%3Crect width='2' height='12' x='12.0208' y='3.53552' fill='%23CD192E' rx='1' transform='rotate(45 12.0208 3.53552)'/%3E%3Crect width='2' height='12' x='3.53552' y='4.94971' fill='%23CD192E' rx='1' transform='rotate(-45 3.53552 4.94971)'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    width: 17px;
    height: 17px;
    display: block;
    z-index: 10;
    position absolute
    left: 11px
  &.is-disabled.is-correct
    border: 1px solid #07A23B;
    background transparent
    color: #000;
  &.is-picked.is-disabled.is-correct
    background #ffffff
    border: none;
    color: #000;
  &.is-disabled.is-correct:before
    content: ''
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 15 15'%3E%3Crect width='2' height='8' y='8.48535' fill='%2307A23B' rx='1' transform='rotate(-45 0 8.48535)'/%3E%3Crect width='2' height='12' x='12.7279' y='4.24268' fill='%2307A23B' rx='1' transform='rotate(45 12.7279 4.24268)'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    width: 14px;
    height: 14px;
    display: block;
    z-index: 10;
    position absolute
    left: 11px

  @media (max-width: 520px)
      padding: 0 25px;
      height 60px;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      &:hover
        color: #000
      &.is-picked.is-disabled.is-wrong:before
        width: 12px;
        height: 14px;
      &.is-disabled.is-correct:before
        width: 12px;
        height: 12px;

  @media (max-width: 320px)
    font-size: 13px;
    line-height: 16px;


</style>
