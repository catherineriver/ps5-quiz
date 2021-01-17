<template>
    <div class="special-ps5-quiz-more" ref="ps5result">
        <div v-if="isShowMore && isFullPage" @click="closeMore" class="special-ps5-quiz-more__close"></div>
        <div class="special-ps5-quiz-more__content">
          <p>Есть две модели PlayStation 5&nbsp;&mdash; с&nbsp;дисководом (Ultra HD&nbsp;Blu-Ray) и&nbsp;без (Digital). Они стоят 46&nbsp;999 и&nbsp;37&nbsp;999 рублей соответственно.</p>
          <p>У&nbsp;обеих версий одинаковая производительность. Разница лишь в&nbsp;том, что в&nbsp;Digital-модель не&nbsp;вставить диск. Но&nbsp;все игры можно приобрести и&nbsp;скачать из&nbsp;PS&nbsp;Store.</p>
          <p>Внутри у&nbsp;PS5&nbsp;&mdash; мощный SSD, благодаря которому игры быстрее запускаются, а&nbsp;во&nbsp;многих вовсе исчезают внутриигровые загрузки. Есть поддержка вывода изображения в&nbsp;8К&nbsp;и&nbsp;трёхмерного звука с&nbsp;технологией Tempest 3D&nbsp;AudioTech.</p>
          <p>DualSense&nbsp;&mdash; новый геймпад с&nbsp;тактильным откликом, который позволит почувствовать, как герой идёт по&nbsp;песку или как заклинило оружие.</p>
          <p>PlayStation VR&nbsp;будет работать с&nbsp;новой консолью.</p>
        </div>
        <div v-if="isShowMore" class="special-ps5-quiz-more__wrapper" @click="sendAnalytics('Promo')">
            <a href='https://bit.ly/36ysZ6s' target="_blank"
              :class="['special-ps5-quiz-promo__button',
              'special-ps5-quiz-promo__button--black',
              {'special-ps5-quiz-promo__button--mobile': $screen.width < 520}]">
              Интересно
            </a>
        </div>
    </div>
</template>

<script>
import * as Analytics from '../lib/analytics';

export default {
  name: 'MoreBlock',
  props: {
    isShowMore: {
      type: Boolean,
    },
    isFullPage: {
      type: Boolean,
    },
  },
  methods: {
    closeMore() {
      this.$emit('close-more');
    },
    sendAnalytics(value) {
      Analytics.sendEvent(value);
    },
  },
  mounted() {
    setTimeout(() => {
      const scrollTo = (to, duration) => {
        const start = window.pageYOffset;
        const change = to - start;
        let currentTime = 0;
        const increment = 20;

        const animateScroll = () => {
          currentTime += increment;
          const val = Math.easeInOutQuad(currentTime, start, change, duration);
          window.scroll(0, val);
          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };
        animateScroll();
      };

      Math.easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t -= 1;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const scrollToElement = (ref) => {
        scrollTo(ref.getBoundingClientRect().top + window.scrollY - 100, 500);
      };

      scrollToElement(this.$refs.ps5result);
    });
  },
};
</script>

<style lang="stylus">
.special-ps5-quiz-more
  font-size: 16px;
  line-height: 26px;
  &__content
    & > p
        display flex
        flex-direction row
        margin: 30px 0;
    & > p:before
        content ''
        flex-grow: 0
        flex-shrink: 0
        background-size: contain;
        background-repeat: no-repeat;
        width: 12px;
        height: 12px;
        display: block;
        margin-right: 17px;
        margin-top: 6px;
    & > p:first-child:before,p:last-child:before
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M1.72697 12L6 7.72687 10.273 12 12 10.273 7.72697 5.99985 12 1.72672 10.273 0 6 4.27313 1.72697 0 0 1.72672l4.27303 4.27313L0 10.273 1.72697 12z'/%3E%3C/svg%3E");
    & > p:nth-child(2):before
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 12'%3E%3Cpath fill='%23000' d='M0 12h14L6.99955 0 0 12zm4.21478-2.39631l2.78477-4.77391 2.78507 4.77391H4.21478z'/%3E%3C/svg%3E");
    & > p:nth-child(3):before
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M0 12h12V0H0v12zm2.4-9.6h7.2v7.2H2.4V2.4z'/%3E%3C/svg%3E");
    & > p:nth-child(4):before
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 12 13'%3E%3Cpath fill='%23000' d='M5.99991.514551c-3.3085 0-6.00000155 2.691799-6.00000155 5.999999 0 3.3085 2.69150155 6.00005 6.00000155 6.00005 3.30849 0 5.99999-2.69155 5.99999-6.00005 0-3.3082-2.6915-5.999999-5.99999-5.999999zm0 9.600049c-1.98545 0-3.6-1.6146-3.6-3.60005 0-1.98516 1.61455-3.6 3.6-3.6 1.98545 0 3.6 1.61484 3.6 3.6 0 1.98545-1.61455 3.60005-3.6 3.60005z'/%3E%3C/svg%3E");
    & > .special-ps5-quiz-promo__button
        max-width 295px;

  &__close
    &:after, &:before
        content ''
        background-size: contain;
        width: 26px;
        height: 26px;
        position: absolute;
        right: 10px;
        top: 10px;
        transition: opacity .2s
    &:after
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 26 26'%3E%3Crect width='3.12392' height='18.026' x='18.2686' y='5.52258' fill='%23CCC' rx='1.56196' transform='rotate(45 18.2686 5.52258)'/%3E%3Crect width='3.00433' height='18.7435' x='5.31104' y='7.43542' fill='%23CCC' rx='1.50216' transform='rotate(-45 5.31104 7.43542)'/%3E%3C/svg%3E");
    &:before
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 26 26'%3E%3Crect width='3.12392' height='18.026' x='18.2686' y='5.52258' fill='%234DA0DA' rx='1.56196' transform='rotate(45 18.2686 5.52258)'/%3E%3Crect width='3.00433' height='18.7435' x='5.31104' y='7.43542' fill='%234DA0DA' rx='1.50216' transform='rotate(-45 5.31104 7.43542)'/%3E%3C/svg%3E");
        opacity 0
    &:hover
        cursor pointer
        &:after
            opacity 0;
        &:before
            opacity 1;
    @media(max-width: 1020px)
      display none
  &__wrapper
    display flex
    flex-direction row
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 40px;

</style>
