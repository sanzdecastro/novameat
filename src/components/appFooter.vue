<script>

import Logo from './logo.vue';

export default {
  name: "appFooter",
  components: {
    Logo,
  },
};
</script>
<template>
    <footer class="bg-pink m-sm p-sm rounded-[15px] md:h-footer-height flex flex-col justify-between text-small">
        <div class="header-footer flex flex-col md:flex-row justify-between ">
            <div class="newsletter max-w-[90%] md:max-w-max-ssm pb-[44px]">
                <p>Sign up to our newsletter and get a carefully curated selection of recipes, interviews, research, and other industry news–straight from our journal to your inbox.</p>
            </div>
            <div class="legal-lang-social flex pb-[44px]">
                <div class="w-full legal-lang md:w-max-ssm flex flex-col">
                    <ul class="w-full pb-md">
                        <li><a href="/legal/legal-notice">Legal Notice</a></li>
                        <li><a href="/legal/cookie-policy">Cookie Information</a></li>
                        <li><a href="/legal/privacy-statement">Privacy Statement</a></li>
                    </ul>
                    <ul class="lang flex">
                        <li><a href="">ES</a></li> / <li><a href="">EN</a></li>
                    </ul>
                </div>
                <div class="w-full social md:w-max-ssm flex flex-col">
                    <a href="">LinkedIn</a>
                    <a href="">Instagram</a>
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
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/v-label.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/gluten-free.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/food-safety.svg">
                    </div>
                </div>
                <div class="financial flex flex-col">
                    <p class="pb-md md:w-max-ssm">Financial support from CDTI through the NEOTEC programme Co-funded by the European Union's EIC Accelerator programme Grant Agreement Nº 190112238</p>
                    <div class="logos flex gap-lg flex-wrap md:flex-nowrap">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/ministerio-economia.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/cdti.svg">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/eu.svg">
                    </div>
                </div>
                <div class="member flex flex-col">
                    <p class="pb-md">Proud members of:</p>
                    <div class="logos">
                        <img class="h-[calc((23/360)*100vw)] md:h-[calc((40/1515)*100vw)]" src="/eit.svg">
                    </div>
                </div>
            </div>
        </div>

	</footer>
</template>