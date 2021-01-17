<template>
    <div @click="goToHint(index)" :class="['special-ps5-quiz-navigate__item',
        {'selected': quoteIndex === index}
        ]">
        <span>{{index}}</span>
    </div>
</template>

<script>
import * as Analytics from '../lib/analytics';

export default {
  name: 'HintNav',
  components: {
  },
  props: {
    quoteIndex: {
      type: Number,
    },
    index: {
      type: Number,
    },
    questionIndex: {
      type: Number,
    },
  },
  methods: {
    goToHint(hintIndex) {
      this.$emit('show-previous-hint', hintIndex);
      Analytics.sendEvent('Quote', `${this.quoteIndex}, Question ${this.questionIndex}`);
    },
  },
};
</script>

<style lang="stylus">
.special-ps5-quiz-navigate__item
  display: flex;
  align-items: center;
  justify-content: center;

  padding 0 10px
  color: #4DA0DA;
  border: 1px solid #4DA0DA;
  border-radius: 5px;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;

  width: 40px;
  height 40px;
  line-height 40px;

  margin: 0 5px;
  cursor: pointer
  transition: box-shadow 0.2s;
  &:hover
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    @media(max-width: 520px)
      &:hover
        cursor: default
        box-shadow: none


  &.selected
      background: #4DA0DA;
      color: #ffffff

</style>
