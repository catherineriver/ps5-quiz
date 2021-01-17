<template>
    <div class="special-ps5-quiz-result">
        <div class="special-ps5-quiz-result__header">
          <div class="special-ps5-quiz-result__title">
              Вы угадали
          </div>
          <div class="special-ps5-quiz-result__score">
              {{this.score}} из 7 игр
          </div>
        </div>
        <div class="special-ps5-quiz-result__image" :style="cssVars">
          <img :src="data.image" alt="">
        </div>

        <div class="likely" ref='share'>
          <div :class="['special-ps5-quiz-result__share', {'special-ps5-quiz-result__share--copied':showModal}]"
            v-clipboard="clipboardCopyHandler()"
            v-clipboard:success="clipboardSuccessHandler" />
        </div>
    </div>
</template>

<script>
import * as Analytics from '../lib/analytics';
import * as Share from '../lib/share';


export default {
  name: 'Result',
  props: {
    data: {
      type: Object,
    },
    score: {
      type: Number,
    },
  },
  data() {
    return {
      url: '',
      showModal: false,
    };
  },
  computed: {
    cssVars() {
      return {
        '--top': this.data.top,
        '--right': this.data.right,
        '--width': this.data.width,
      };
    },
  },
  methods: {
    declineWord(number, words) {
      let result = '';

      if (number % 10 === 1 && number % 100 !== 11) {
        result += words[0];
      } else if ([2, 3, 4].indexOf(number % 10) > -1 && [12, 13, 14].indexOf(number % 100) < 0) {
        result += words[1];
      } else {
        result += words[2];
      }

      return result;
    },
    share() {
      const socials = this.$refs.share;
      Share.make(socials, {
        title: 'Угадайте игру по цитате из обзора',
        url: `https://dtf.ru/special/quotes/share/${this.score}`,
      });
    },
    clipboardCopyHandler() {
      this.url = `https://dtf.ru/special/quotes/share/${this.score}`;

      return this.url;
    },
    clipboardSuccessHandler({ value, event }) {
      this.value = value;
      this.event = event;
      Analytics.sendEvent('share-link');
      clearTimeout(this.modalTimeout);
      this.showModal = true;
      this.modalTimeout = setTimeout(() => {
        this.showModal = false;
      }, 1500);
    },
  },
  mounted() {
    Analytics.sendEvent('Result', 'Show');
    this.share();
  },
};
</script>

<style lang="stylus">
.special-ps5-quiz-result
    position: relative;
    &__share
      z-index 10
      order: 2;
      position relative
      display: inline-flex;
      flex: 0 0 auto;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 5px;

      font-weight: normal;
      font-size: 15px;
      line-height: 40px;
      background: #fff;
      text-decoration none
      color #4DA0DA

      border: 1px solid #4DA0DA;
      border-radius: 5px;
      cursor pointer
      transition: background .2s, color .2s
      height: 40px;
      width: 100%;
      max-width 40px
      &--copied::before
        content 'Cсылка скопирована'
        background: #FFFFFF;

        box-shadow: 0px 3px 6px #8CC0E3;
        border-radius: 3px;
        position: absolute;
        bottom: 50px;
        right: 0;

        padding: 6px 8px;
        font-size: 12px;
        line-height: 12px;
        display: block;

        width: 138px;
        transform: translateX(45px);
        color: #000;

        @media (max-width: 320px)
          right: 30px;

      &::after
        content ''
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath fill='%234DA0DA' d='M18.6271 1.37297c-1.8307-1.830621-4.7985-1.830621-6.6292-.00004L8.0802 5.29067c-1.89356 1.89363-1.71825 4.91083 0 6.62913.28773.2877.60609.5224.94226.715l.71504-.715c.469-.4691.3039-1.0174.2955-1.413-.10296-.073-.20308-.1519-.2955-.2443-.88176-.88167-.92141-2.39316 0-3.31457.13684-.13683 3.8346-3.83461 3.9177-3.91765.914-.91403 2.4005-.91403 3.3145 0 .914.91402.914 2.40054 0 3.31457l-2.5895 2.58957c.0748.41433.5243 1.39578.2931 3.01488.0113-.0111.0248-.0182.036-.0295l3.9178-3.91769c1.8305-1.83062 1.8305-4.79851 0-6.62914z'/%3E%3Cpath fill='%234DA0DA' d='M12.2234 7.77662c-.2877-.28773-.6061-.52234-.9422-.71504l-.7151.71504c-.469.46899-.304 1.01731-.2955 1.41297.103.07297.2031.15184.2955.24426.8818.88175.9214 2.39315 0 3.31455-.1371.1372-4.14119 4.1412-4.22131 4.2213-.91402.9141-2.40055.9141-3.31457 0-.91403-.914-.91403-2.4005 0-3.3145l2.89324-2.8933c-.07488-.4143-.52433-1.39578-.29312-3.01485-.01129.0111-.02489.01832-.03614.02953L1.37291 11.998c-1.830547 1.8306-1.830547 4.7985 0 6.6291 1.83063 1.8305 4.79848 1.8305 6.62911 0l4.22138-4.2213c1.8584-1.8585 1.7568-4.87234 0-6.62918z'/%3E%3C/svg%3E");
        background-position: center;
        background-size: contain;
        width: 20px;
        height: 20px;
      &:hover
        background #4DA0DA
        color: #fff
        &::after
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' d='M18.6271 1.37297c-1.8307-1.830621-4.7985-1.830621-6.6292-.00004L8.0802 5.29067c-1.89356 1.89363-1.71825 4.91083 0 6.62913.28773.2877.60609.5224.94226.715l.71504-.715c.469-.4691.3039-1.0174.2955-1.413-.10296-.073-.20308-.1519-.2955-.2443-.88176-.88167-.92141-2.39316 0-3.31457.13684-.13683 3.8346-3.83461 3.9177-3.91765.914-.91403 2.4005-.91403 3.3145 0 .9141.91402.9141 2.40054 0 3.31457l-2.5895 2.58957c.0748.41433.5243 1.39578.2931 3.01488.0113-.0111.0248-.0182.036-.0295l3.9178-3.91769c1.8305-1.83062 1.8305-4.79851 0-6.62914z'/%3E%3Cpath fill='%23fff' d='M12.2234 7.77662c-.2877-.28773-.6061-.52234-.9422-.71504l-.7151.71504c-.469.46899-.304 1.01731-.2955 1.41297.103.07297.2031.15184.2955.24426.8818.88175.9214 2.39315 0 3.31455-.1371.1372-4.14119 4.1412-4.22131 4.2213-.91402.9141-2.40055.9141-3.31457 0-.91403-.914-.91403-2.4005 0-3.3145l2.89324-2.8933c-.07488-.4143-.52433-1.39578-.29312-3.01485-.01129.0111-.02489.01832-.03614.02953L1.37291 11.998c-1.830547 1.8306-1.830547 4.7985 0 6.6291 1.83063 1.8305 4.79848 1.8305 6.62911 0l4.22138-4.2213c1.8584-1.8585 1.7568-4.87234 0-6.62918z'/%3E%3C/svg%3E");
      @media (max-width: 768px)
        order: 5;
        &:hover
          background #fff
          &::after
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath fill='%234DA0DA' d='M18.6271 1.37297c-1.8307-1.830621-4.7985-1.830621-6.6292-.00004L8.0802 5.29067c-1.89356 1.89363-1.71825 4.91083 0 6.62913.28773.2877.60609.5224.94226.715l.71504-.715c.469-.4691.3039-1.0174.2955-1.413-.10296-.073-.20308-.1519-.2955-.2443-.88176-.88167-.92141-2.39316 0-3.31457.13684-.13683 3.8346-3.83461 3.9177-3.91765.914-.91403 2.4005-.91403 3.3145 0 .914.91402.914 2.40054 0 3.31457l-2.5895 2.58957c.0748.41433.5243 1.39578.2931 3.01488.0113-.0111.0248-.0182.036-.0295l3.9178-3.91769c1.8305-1.83062 1.8305-4.79851 0-6.62914z'/%3E%3Cpath fill='%234DA0DA' d='M12.2234 7.77662c-.2877-.28773-.6061-.52234-.9422-.71504l-.7151.71504c-.469.46899-.304 1.01731-.2955 1.41297.103.07297.2031.15184.2955.24426.8818.88175.9214 2.39315 0 3.31455-.1371.1372-4.14119 4.1412-4.22131 4.2213-.91402.9141-2.40055.9141-3.31457 0-.91403-.914-.91403-2.4005 0-3.3145l2.89324-2.8933c-.07488-.4143-.52433-1.39578-.29312-3.01485-.01129.0111-.02489.01832-.03614.02953L1.37291 11.998c-1.830547 1.8306-1.830547 4.7985 0 6.6291 1.83063 1.8305 4.79848 1.8305 6.62911 0l4.22138-4.2213c1.8584-1.8585 1.7568-4.87234 0-6.62918z'/%3E%3C/svg%3E");
    &__header
      display flex
      flex-direction: column;
      @media (max-width: 520px)
        flex-direction row;
        order: 2;
        margin-bottom 18px;
    &__title
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
    &__score
        font-weight: bold;
        font-size: 48px;
        line-height: 28px;
        margin-top: 18px;
        margin-bottom: 23px;

        color: #4DA0DA;
    &__image
        position: absolute;
        top: var(--top);
        right: var(--right);
        max-width: var(--width);
    @media (max-width: 520px)
      display: flex;
      flex-direction: column;
      padding-top: 193px;
      &__image
        order: 1;
        top: -30px!important;
        right: -25px !important
        max-width: 328px;
      &__title
        font-weight: 500;
        font-size: 32px;
        line-height: 28px;
        margin-right: 10px;
      &__score
        font-weight: 500;
        font-size: 32px;
        line-height: 28px;
        margin: 0;
    @media (max-width: 375px)
      &__image
        right: -45px !important

    @media (max-width: 320px)
      &__image
        right: -70px !important
      &__title
        font-size: 28px;
        line-height: 24px;
      &__score
        font-size: 28px;
        line-height: 24px;


.likely
  display: flex;
  z-index: 10;
  @media (max-width: 520px)
    order:4
.likely--custom
  margin-left: -5px;
  display flex
  flex-direction row
  align-items center
  width: 250px;

  & .likely__widget
      display: inline-flex;
      flex: 0 0 auto;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 5px;

      font-weight: normal;
      font-size: 15px;
      line-height: 40px;
      background: #fff;
      text-decoration none
      color #4DA0DA

      border: 1px solid #4DA0DA;
      border-radius: 5px;
      cursor pointer
      transition: background .2s, color .2s
      height: 40px;
      width: 100%;
      max-width 40px
      & .likely__icon
          fill: currentColor;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          & > svg
              width: 20px;
              height: 20px;
      &:hover
          background #4DA0DA
          color: #fff
      @media (max-width: 375px)
          margin: 0 3px;
          font-size: 14px;
          &:hover
              box-shadow: none
  & .likely__widget--facebook
    max-width: 140px;
    & svg
      width: 22px;
      height: 21px;
      margin-right: 10px;
    @media (max-width: 320px)
      max-width: 130px;
  @media (max-width: 375px)
    max-width 100%
    width: 235px;
</style>
