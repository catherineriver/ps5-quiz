<template>
    <div class='special-ps5-quiz-quote'>
        <div v-html="data.desc"
        :class="['special-ps5-quiz-quote__desc',
        {'special-ps5-quiz-quote__visible' : isUserPickAnswer}]">

        </div>
        <div v-html="data.author"></div>
    </div>
</template>

<script>

export default {
  name: 'Quote',
  props: {
    data: {
      type: Object,
    },
    isUserPickAnswer: {
      type: Boolean,
    },
  },

};
</script>

<style lang="stylus">
.special-ps5-quiz-quote
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    margin-left: 63px;
    &__visible
      & > .special-ps5-quiz-quote__black
        background: transparent;

    &__author
      margin 10px 0
      color: #4DA0DA;
    &__black
      position: relative;

      display: inline;
      background: #000;
      pointer-events: none;
      user-select: none;
      transition: background .25s ease;

    @media (max-width: 375px)
      font-size: 16px;
      line-height: 24px;

      margin-left: 40px;
</style>
