import { c as create_ssr_component, d as add_attribute } from "../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let windowWidth = 0;
  let logoSize = 0;
  const setLogoSize = () => {
    {
      logoSize = windowWidth * 5.8;
    }
  };
  {
    setLogoSize();
  }
  return `
${$$result.head += `<!-- HEAD_svelte-1ji7uhk_START -->${$$result.title = `<title>Home</title>`, ""}<meta name="${"description"}" content="${"SvgDev Website"}"><!-- HEAD_svelte-1ji7uhk_END -->`, ""}

<section><div class="${"flex flex-col justify-center items-center w-screen h-screen bg-[#0f0531] overflow-auto"}"><div class="${"text-blue-300 text-center w-full h-full flex flex-col justify-center sm:justify-start items-center"}"><div${add_attribute("class", `w-[${logoSize}] h-[${logoSize}]`, 0)}>${``}</div>
			${``}</div></div>
</section>`;
});
export {
  Page as default
};
