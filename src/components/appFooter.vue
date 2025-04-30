<script>

import Logo from './logo.vue';

export default {
  name: "appFooter",
  components: {
    Logo,
  },
  props: {
    lang: { 
      type: String,
    },
    routes: { 
      type: Array, 
    }, 
    switchUrls: { 
      type: Array, 
    },
  }
};
</script>
<template>
    <footer class="bg-pink m-sm p-md rounded-[15px] md:h-footer-height flex flex-col justify-between text-small">
        <div class="header-footer flex flex-col md:flex-row justify-between ">
            <div class="newsletter max-w-[90%] md:max-w-max-ssm pb-[44px]">
                <p>Sign up to our newsletter and get a carefully curated selection of recipes, interviews, research, and other industry news–straight from our journal to your inbox.</p>
                <div id="mc_embed_shell">
                    

                <div id="mc_embed_signup">
                    <form action="https://novameat.us21.list-manage.com/subscribe/post?u=400b324dad162be4fe0070446&amp;id=0622b2f3b8&amp;f_id=0033c7e9f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                        <div id="mc_embed_signup_scroll" class="flex justify-between mt-sm border-b border-b-black">
                            <div class="mc-field-group"><input class="required email font-haffe focus:outline-none " type="email" name="EMAIL"  placeholder="Your e-mail here" id="mce-EMAIL" required="" value=""></div>
                        <div id="mce-responses" class="clear !relative">
                            <div class="response" id="mce-error-response" style="display: none;"></div>
                            <div class="response" id="mce-success-response" style="display: none;"></div>
                        </div><div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_400b324dad162be4fe0070446_0622b2f3b8" tabindex="-1" value=""></div><div class="clear"><input  type="submit" name="subscribe" id="mc-embedded-subscribe" class="button cursor-pointer" value="Subscribe"></div>
                    </div>
                </form>
            </div>
                <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>
            </div>
            <div class="legal-lang-social flex pb-[44px]">
                <div class="w-full legal-lang md:w-max-ssm flex flex-col">
                    <ul class="w-full pb-md">
                        <li><a href="/en/legal/legal-notice">Legal Notice</a></li>
                        <li><a href="/en/legal/cookie-policy">Cookie Information</a></li>
                        <li><a href="/en/legal/privacy-statement">Privacy Statement</a></li>
                    </ul>
                    <ul class="lang flex">
                        <!-- <li><a href="">ES</a></li> / <li><a href="">EN</a></li> -->
                    </ul>
                    <ul class="lang gap-2 flex language-switcher">
                        <li v-for="item in switchUrls" :key="item.code">
                            <a
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

        <div class="center-footer flex flex-col gap-xs md:flex-row items-start my-[76px] md:my-none" >
            <Logo class="h-[calc((12/360)*100vw)] md:h-[calc((35/1515)*100vw)] md:max-h-[24px] mt-[5px] pr-sm" color="black" />
            <div class="h-[calc((20/360)*100vw)] md:h-[calc((48/1515)*100vw)] md:max-h-[38px]  reel-footer text-title overflow-hidden leading-[100%]"><p>A new culinary tradition</p><p>Specially created for food makers</p></div>
        </div>

        <div class="footer-footer flex items-start md:items-end justify-between">
            <div class="copyright font-haffe w-full md:w-1/3">
                Novameat® 2025 <br class="md:hidden">All Rights Reserved
            </div>
            <div class="info  w-full font-haffe flex flex-col md:flex-row  md:items-end gap-[calc((95/1515)*100vw)]">
                <div class="certifications flex flex-col md:justify-between md:h-full">
                    <p class="pb-md">Certifications:</p>
                    <div class="logos flex gap-lg flex-wrap md:flex-nowrap">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/v-label.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/gluten-free.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/food-safety.svg">
                    </div>
                </div>
                <div class="financial flex flex-col">
                    <p class="pb-md md:w-max-ssm">Financial support from CDTI through the NEOTEC programme Co-funded by the European Union's EIC Accelerator programme Grant Agreement Nº 190112238</p>
                    <div class="logos flex gap-lg flex-wrap md:flex-nowrap">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/ministerio-economia.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/cdti.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/eu.svg">
                    </div>
                </div>
                <div class="member flex flex-col">
                    <p class="pb-md">Proud members of:</p>
                    <div class="logos">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)] md:max-h-[35px]" src="/eit.svg">
                    </div>
                </div>
            </div>
        </div>

	</footer>
</template>