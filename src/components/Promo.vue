<template>
    <div :class="[
          'special-ps5-quiz-promo',
          {'showMore': isShowMore && isFullPage}]">
        <div class="special-ps5-quiz-promo__content">
            <div class="special-ps5-quiz-promo__desc">
                <div class="special-ps5-quiz-promo__logo"></div>
                В эти игры можно поиграть на&nbsp;PlayStation 5&nbsp;благодаря обратной совместимости, плюс в&nbsp;новую &laquo;Человек-Паук: Майлз Моралес&raquo; и&nbsp;ремейк Demon&rsquo;s Souls. А&nbsp;уже в&nbsp;2021 году выйдут ещё несколько эксклюзивов&nbsp;&mdash; Horizon: Forbidden West и&nbsp;God of&nbsp;War: Ragnarok.
            </div>
            <a href='https://bit.ly/36ysZ6s' target="_blank"
                v-if="$screen.width < 520"
                @click="sendAnalytics"
                class="special-ps5-quiz-promo__button special-ps5-quiz-promo__button--black special-ps5-quiz-promo__button--mobile">
                    Интересно
            </a>
            <div class="special-ps5-quiz-promo__image">
                <img src="https://leonardo.osnova.io/00f7a128-fb28-5583-84dc-e73083095aed/" alt="">
            </div>
        </div>
        <div class="special-ps5-quiz-promo__bg">
            Для тех, кто не&nbsp;покупал PS4 и&nbsp;пропустил важные релизы, компания предусмотрела новую фичу для подписчиков&nbsp;&mdash; &laquo;Коллекция PlayStation Plus&raquo;. Они получат доступ к&nbsp;коллекции из&nbsp;18&nbsp;лучших игр прошлого поколения, в&nbsp;том числе God of&nbsp;War (2018), Bloodborne, &laquo;Одни из&nbsp;нас&raquo; и&nbsp;Uncharted&nbsp;4. Список будет пополняться и&nbsp;меняться.
        </div>

        <div v-if="!isShowMore" class="special-ps5-quiz-promo__buttons">
            <a v-if="$screen.width > 520"
                @click="sendAnalytics"
                href='https://bit.ly/36ysZ6s' target="_blank"
                class="special-ps5-quiz-promo__button special-ps5-quiz-promo__button--black">
                Интересно
            </a>
            <div :class="[
            'special-ps5-quiz-promo__button',
            {'special-ps5-quiz-promo__button--mobile': $screen.width < 520}]"
            @click="showMore">Больше о PS5</div>
        </div>

        <MoreBlock :isShowMore="isShowMore" :isFullPage="isFullPage" @close-more="closeMore" v-if="isShowMore"/>
    </div>
</template>

<script>
import * as Analytics from '../lib/analytics';
import MoreBlock from './MoreBlock.vue';

export default {
  name: 'Promo',
  components: {
    MoreBlock,
  },
  data() {
    return {
      isShowMore: false,
    };
  },

  props: {
    isFullPage: {
      type: Boolean,
    },
  },
  methods: {
    sendAnalytics() {
      Analytics.sendEvent('Promo');
    },
    showMore() {
      this.isShowMore = true;
      this.$emit('show-more');
      Analytics.sendEvent('More');
    },
    closeMore() {
      this.isShowMore = false;
    },

  },
};
</script>

<style lang="stylus">
.special-ps5-quiz-promo
    padding: 20px;
    background: #fff;
    width: 640px
    max-width: 100%
    margin: 0 auto
    &__logo
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 146 33'%3E%3Cpath fill='%23000' d='M93.6184 26.2634c2.9262 0 5.2749-2.331 5.2749-5.2352v-9.0564c0-1.7578 1.4247-3.17167 3.1957-3.17167h10.242c.077 0 .154-.07643.154-.15285v-1.796c0-.07643-.077-.15285-.154-.15285H99.9714c-2.9262 0-5.2749 2.33098-5.2749 5.23517v9.0182c0 1.7578-1.4246 3.1717-3.1958 3.1717H81.4129c-.077 0-.154.0764-.154.1528v1.796c0 .0764.077.1529.154.1529l12.2055.0382zM116.682 14.0735V6.88947c0-.07643.077-.15285.154-.15285h27.915c.077 0 .154.07642.154.15285v1.796c0 .07643-.077.15285-.154.15285h-23.718c-.077 0-.154.07643-.154.15286v4.70022c0 .8406.693 1.4903 1.501 1.4903h17.635c3.08 0 5.583 2.4838 5.583 5.5408s-2.503 5.5409-5.583 5.5409h-23.179c-.077 0-.154-.0765-.154-.1529v-1.796c0-.0764.077-.1528.154-.1528h21.099c1.926 0 3.504-1.5285 3.504-3.4392 0-1.9106-1.578-3.4774-3.504-3.4774h-18.057c-1.772 0-3.196-1.4138-3.196-3.1716zM75.2909 15.1435c1.7712 0 3.1958-1.4139 3.1958-3.1717s-1.4246-3.17167-3.1958-3.17167H53.8832c-.077 0-.154-.07643-.154-.15285v-1.796c0-.07643.077-.15285.154-.15285h23.4869c2.9262 0 5.2749 2.33098 5.2749 5.23517 0 2.9042-2.3487 5.2351-5.2749 5.2351H61.1218c-1.7712 0-3.1958 1.4139-3.1958 3.1717v5.7319c0 .0764-.077.1529-.154.1529h-3.9273c-.077 0-.154-.0765-.154-.1529v-5.7319c0-2.9042 2.3487-5.2352 5.2749-5.2352l16.3253.0383zM16.2272.240448V30.5432l6.9305 2.1781V7.30982c0-1.1846.5391-1.98707 1.3862-1.71958 1.1165.3057 1.3476 1.41388 1.3476 2.59847V18.3533c4.3123 2.0635 7.7006 0 7.7006-5.4644 0-5.57908-2.0022-8.06291-7.8546-10.04998-2.2717-.76426-6.5456-2.063493-9.5103-2.598472z'/%3E%3Cpath fill='%23000' d='M24.4669 28.3269l11.1274-3.936c1.2706-.4585 1.4632-1.1081.4236-1.4138-1.0396-.344-2.8878-.2293-4.1584.2292l-7.3926 2.5985v-4.1652l.4236-.1528s2.1561-.7643 5.1594-1.07c3.0032-.3439 6.6995.0382 9.5873 1.1082 3.2727 1.0317 3.6193 2.522 2.8107 3.592-.8471 1.0317-2.8492 1.796-2.8492 1.796l-15.0933 5.388v-3.9741h-.0385zM3.55962 27.9065c-3.34977-.9171-3.888815-2.8659-2.38719-4.0123 1.42461-1.0318 3.81181-1.796 3.81181-1.796l9.89536-3.5156v3.9741l-7.12313 2.5221c-1.27061.4585-1.46312 1.0699-.42354 1.4138 1.03959.344 2.88777.2675 4.11987-.2292l3.4268-1.2228v3.5537c-.2311.0383-.4621.0765-.6931.1147-3.3883.6114-7.04608.3821-10.62688-.8025z'/%3E%3C/svg%3E");
        background-size: cover
        width 145px
        height 32px
        margin-bottom 20px
    &__content
        display flex
        flex-direction row
        justify-content: space-between;
        align-items: flex-end;

    &__image
        max-width 220px
        flex-shrink: 0;
    &__desc
        max-width: 370px;
        font-weight: normal;
        font-size: 16px;
        line-height: 26px;
    &__bg
        position relative

        border-radius: 10px
        padding: 14px 18px
        margin: 27px 0 18px 0;

        background: #2C2C2C;
        color: #ffffff
        font-size: 16px;
        line-height: 26px;
        &:after
            content ''
            background-image url('https://leonardo.osnova.io/1c25516b-2892-5fee-9ad8-dc917a9af83a/')
            background-size: contain;
            width: 364px;
            height: 158px;
            mix-blend-mode: overlay;
            display: block;
            background-repeat: no-repeat;
            position: absolute;
            right: 0;
            top: 0;
    &__buttons
        display flex
        flex-direction row
        align-items center

    &__button
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        flex-basis: 50%;

        font-size: 15px;
        line-height 40px;
        border-radius: 5px;

        border: 1px solid #2C2C2C;
        box-sizing: border-box;

        text-decoration: none;

        transition: background .2s, color .2s, border .2s, box-shadow 0.2s

        &:hover
            cursor pointer
            background: #4DA0DA;
            color #ffffff
            box-shadow: 0px 3px 6px #8CC0E3;
            border: 1px solid #4DA0DA;
            @media (max-width: 520px)
                background: #2C2C2C;
                border: none;
                box-shadow: none;

        &--black
            background: #2C2C2C;
            color #ffffff
            margin-right 10px;

        &--mobile
            width: 100%
            flex-basis: 100%;
            margin-right: 0;
            line-height: 38px;
    @media (max-width: 520px)
        padding: 16px;
        &__content
            flex-direction column
            align-items: center;
        &__bg:after
            right: -200px;
            width: 610px;
            height: 100%;
        &__image
            max-width 250px
        &__desc
            margin-bottom: 20px

.special-ps5-quiz-promo.showMore
    position: relative;
    padding: 40px;
    &:after
        content: ''
        background: #000000;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left 0
    @media (max-width: 1020px)
        width 640px
        padding: 20px
        &:after
            display none

</style>
