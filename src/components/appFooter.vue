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
    <footer class="bg-pink m-sm p-sm rounded-[15px] h-footer-height flex flex-col justify-between text-small">
        <div class="header-footer flex justify-between">
            <div class="newsletter max-w-max-ssm">
                <p>Sign up to our newsletter and get a carefully curated selection of recipes, interviews, research, and other industry news–straight from our journal to your inbox.</p>
            </div>
            <div class="legal-lang-social flex">
                <div class="legal-lang w-max-ssm flex flex-col">
                    <ul>
                        <li><a href="">Legal Notice</a></li>
                        <li><a href="">Cookie Information</a></li>
                        <li><a href="">Privacy Statement</a></li>
                    </ul>
                    <ul class="lang flex">
                        <li><a href="">ES</a></li> / <li><a href="">EN</a></li>
                    </ul>
                </div>
                <div class="social w-max-ssm flex flex-col">
                    <a href="">LinkedIn</a>
                    <a href="">Instagram</a>
                </div>
            </div>
        </div>

        <div class="center-footer flex items-start " >
            <Logo class="h-[calc((34/1515)*100vw)] mt-xs pr-sm" color="black" />
            <div class="h-[calc((48/1515)*100vw)] reel-footer text-big overflow-hidden leading-[100%]"><p>A new culinary traidition</p><p>Specially created for food makers</p></div>
        </div>

        <div class="footer-footer flex items-end justify-between">
            <div class="copyright">
                Novameat® 2025 All Rights Reserved
            </div>
            <div class="info flex items-end gap-[calc((95/1515)*100vw)]">
                <div class="certifications flex flex-col">
                    <p class="pb-md">Certifications:</p>
                    <div class="logos flex gap-lg">
                        <img class="h-[calc((45/1515)*100vw]" src="/v-label.svg">
                        <img class="h-[calc((45/1515)*100vw]" src="/gluten-free.svg">
                        <img class="h-[calc((45/1515)*100vw]" src="/food-safety.svg">
                    </div>
                </div>
                <div class="financial flex flex-col">
                    <p class="pb-md w-max-ssm">Financial support from CDTI through the NEOTEC programme Co-funded by the European Union's EIC Accelerator programme Grant Agreement Nº 190112238</p>
                    <div class="logos flex gap-lg">
                        <img class="h-[calc((45/1515)*100vw]" src="/ministerio-economia.svg">
                        <img class="h-[calc((45/1515)*100vw]" src="/cdti.svg">
                        <img class="h-[calc((45/1515)*100vw]" src="/eu.svg">
                    </div>
                </div>
                <div class="member flex flex-col">
                    <p class="pb-md">Proud members of:</p>
                    <div class="logos">
                        <img class="h-[calc((45/1515)*100vw]" src="/eit.svg">
                    </div>
                </div>
            </div>
        </div>

	</footer>
</template>