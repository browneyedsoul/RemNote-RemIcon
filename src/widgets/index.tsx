import { declareIndexPlugin, PowerupNamespace, ReactRNPlugin } from "@remnote/plugin-sdk";

export const [CUSTOM_ICON, IconTag] = ["custom-icon_powerup", "75px"];

const sizeFix = `
  [data-rem-container-tags~="75px"] {
    overflow-x: auto;
    overflow-y: hidden;
  }
  [data-rem-container-tags~="75px"] .inline-block {
    width: fit-content;
  }
  [data-rem-container-tags~="75px"] .inline-block .inline-block.align-text-top {
    width: 75px !important;
    max-height: unset !important;
    min-height: unset !important;
    max-width: unset !important;
    min-width: unset !important;
    height: auto !important;
  }
`;

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerPowerup("Custom Icon", CUSTOM_ICON, "A Power-up Rem for saving rem icons", { slots: [] });

  // async function add(IconTag: string) {
  //   const docTitle = await plugin.powerup.getPowerupByCode(CUSTOM_ICON);
  //   await docTitle?.addTag(IconTag); 
  // }
  
  const remIcon = await plugin.powerup.getPowerupByCode(CUSTOM_ICON);
  await remIcon?.addTag(IconTag);
  
  const iconTitle = await remIcon?.text[0];

  if (iconTitle == "Custom Icon") {
    await plugin.app.registerCSS("sizeFix", sizeFix);
    const title = await plugin.window.getOpenPaneRemIds();
  } else {
    return;
  }

  await plugin.app.registerCommand({
    id: "rem-icon",
    name: "Custom Icon",
    action: async () => {
      await remIcon?.openRemAsPage();
    },
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
