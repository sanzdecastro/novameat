<script setup lang="ts">

    import { defineProps } from 'vue'
    import Logo from './logo.vue'
    import { activeFooterLogoGroups } from '../lib/footerLogos'

    interface SwitchUrl { code: string; url: string }
    interface Routes { [key: string]: string }
    interface Props {
        lang: string
        routes: Routes
        page:  {
    type: Object,
    required: true
  }
        miniFooter: boolean
        langIsActive: boolean
        switchUrls: SwitchUrl[]
        messages: Record<string, any>
    }

    

    // 1️⃣ Definimos las props del componente
    const props = defineProps<Props>()
        
    // 2️⃣ Función de traducción básica basada en el JSON
    const t = (key: string) => {
    return key.split('.')
        .reduce((obj: any, part: string) => obj?.[part], props.messages) ?? ''
    }

    // 3️⃣ Logos institucionales (certificaciones, ayudas, premios)
    const logoGroups = activeFooterLogoGroups
    const logoClass = 'h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px] w-auto'
    // Los sellos circulares necesitan el doble de alto para ser legibles
    const logoClassTall = 'h-[calc((46/360)*100vw)] md:h-[calc((80/1515)*100vw)] md:max-h-[70px] w-auto'

</script>

<template>
     <footer v-if="miniFooter" class="fixed w-full justify-between bottom-0 left-0  z-50 p-md pb-3 text-white flex text-xs">
        <div class="flex items-end">
            <p>Novameat® 2025 <br class="md:hidden">{{ t('footer.copyright') }}</p>
        </div>
        <div class="flex-column lg:flex gap-6">
            <ul class="flex-column lg:flex gap-3">
                <li><a :href="`/${lang}/legal/${t('legal.urls.legal_notice')}`">{{ t('footer.legal_notice') }}</a></li>
                <li><a :href="`/${lang}/legal/${t('legal.urls.cookie_information')}`">{{ t('footer.cookie_information') }}</a></li>
                <li><a :href="`/${lang}/legal/${t('legal.urls.privacy_statement')}`">{{ t('footer.privacy_statement') }}</a></li>
                <li><a :href="`/${lang}/legal/${t('legal.urls.social_media_policy')}`">{{ t('footer.social_media_policy') }}</a></li>
                <li><a href="#" data-open-cookie-settings>{{ t('footer.cookie_settings') }}</a></li>
            </ul>
            <ul v-if="langIsActive" class="lang gap-2 flex language-switcher">
                <li v-for="item in switchUrls" :key="item.code">
                    <a
                    class="hover:underline underline-offset-2"
                    :href="item.url"
                    :class="{ active: item.code === lang }"
                    >
                    {{ item.code.toUpperCase() }}
                    </a>
                </li>
            </ul>
        </div>


    </footer>
    <footer v-else class="bg-pink m-sm p-md rounded-[15px] md:h-footer-height flex flex-col justify-between text-small">
        <div class="header-footer flex flex-col md:flex-row justify-between ">
            <div class="newsletter max-w-[90%] md:max-w-max-ssm pb-[44px]">
                <p>{{ t('footer.text_newsletter') }}</p>
                <div id="mc_embed_shell">
                    

                <div id="mc_embed_signup">
                    <form action="https://novameat.us21.list-manage.com/subscribe/post?u=400b324dad162be4fe0070446&amp;id=0622b2f3b8&amp;f_id=0033c7e9f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                        
                        
                        <div id="mc_embed_signup_scroll" class="flex justify-between mt-sm border-b border-b-black">
                            
                            <div class="mc-field-group">
                                <input class="required email font-haffe focus:outline-none " type="email" name="EMAIL"  :placeholder="t('footer.placeholder_mail')" id="mce-EMAIL" required="true" value="">
                               
                            </div>
                            
                            <div id="mce-responses" class="clear !relative">
                                <div class="response" id="mce-error-response" style="display: none;"></div>
                                <div class="response" id="mce-success-response" style="display: none;"></div>
                            </div>
                            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_400b324dad162be4fe0070446_0622b2f3b8" tabindex="-1" value=""></div>
                            <div class="clear"><input  type="submit" name="subscribe" id="mc-embedded-subscribe" class="button cursor-pointer" :value="t('footer.subscribe_button')"></div>
                        
                        </div>
                    
                        <p class="mt-md text-xs">
                            {{ t('footer.newsletter_info') }}
                            <a :href="`/${lang}/legal/${t('legal.urls.privacy_statement')}`">{{ t('footer.newsletter_info_link') }}</a>.
                        </p>

                        <div class="flex items-center mt-md">
                            (
                            <input type="checkbox" value="1" name="b_XXXXXXXXXXXX_MERGE3" id="MERGE3" required="true">
                            <div class="dot-check"></div>
                            )
                            <label class="pl-xs" for="MERGE3">{{ t('footer.newsletter_consent') }}</label>
                        </div> 
                    </form>
                </div>
                <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>
            </div>
            <div class="legal-lang-social flex pb-[44px]">
                <div class="w-full legal-lang md:w-max-ssm flex flex-col">
                    <ul class="w-full pb-md">
                        <li><a :href="`/${lang}/legal/${t('legal.urls.legal_notice')}`">{{ t('footer.legal_notice') }}</a></li>
                        <li><a :href="`/${lang}/legal/${t('legal.urls.cookie_information')}`">{{ t('footer.cookie_information') }}</a></li>
                        <li><a :href="`/${lang}/legal/${t('legal.urls.privacy_statement')}`">{{ t('footer.privacy_statement') }}</a></li>
                        <li><a :href="`/${lang}/legal/${t('legal.urls.social_media_policy')}`">{{ t('footer.social_media_policy') }}</a></li>
                        <li><a href="#" data-open-cookie-settings>{{ t('footer.cookie_settings') }}</a></li>
                    </ul>
                  
                    <ul v-if="langIsActive" class="lang gap-2 flex language-switcher">
                        <li v-for="item in switchUrls" :key="item.code">
                            <a
                            class="hover:underline underline-offset-2"
                            :href="item.url"
                            :class="{ active: item.code === lang }"
                            >
                            {{ item.code.toUpperCase() }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="w-full social md:w-max-ssm flex flex-col">
                    <a target="_blank" href="https://www.linkedin.com/company/novameat/">LinkedIn</a>
                    <a target="_blank" href="https://www.instagram.com/nova_meat">Instagram</a>
                </div>
            </div>
        </div>

        <div class="center-footer flex flex-col gap-1 md:gap-xs md:flex-row items-start my-[76px] md:my-none" >
            <Logo class="h-[12px] md:h-[calc((35/1515)*100vw)] md:max-h-[24px] mt-[5px] pr-sm" color="black" />
            <div class="h-[18px] md:h-[calc((48/1515)*100vw)] md:max-h-[38px]  reel-footer text-big md:text-title overflow-hidden leading-[100%]">
                <p>{{ t('claims.claim1') }}</p>
                <p>{{ t('claims.claim2') }}</p>
            </div>
        </div>

        <div class="footer-logos w-full font-haffe grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-lg items-start pb-lg">
            <div
                v-for="group in logoGroups"
                :key="group.key"
                :class="['group-' + group.key, 'flex flex-col h-full', group.wide ? 'md:col-span-2' : '']"
            >
                <p class="pb-md md:max-w-max-ssm">{{ t(group.titleKey) }}</p>
                <div class="logos flex flex-wrap items-end gap-lg">
                    <img
                        v-for="logo in group.logos"
                        :key="logo.src"
                        :class="group.tall ? logoClassTall : logoClass"
                        :src="logo.src"
                        :alt="logo.alt"
                        decoding="async"
                    >
                </div>
            </div>
        </div>

        <div class="footer-footer flex items-start md:items-end justify-between ">
            <div class="copyright font-haffe w-full md:w-1/3">
                Novameat® 2025 <br class="md:hidden">{{ t('footer.copyright') }}
            </div>
        </div>

	</footer>
    
</template>