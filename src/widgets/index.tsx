import { declareIndexPlugin, ReactRNPlugin } from "@remnote/plugin-sdk";

export const CUSTOM_ICON = "custom-icon_powerup";

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerPowerup("Custom Icon", CUSTOM_ICON, "A Power-up Rem for saving rem icons", { slots: [] });

  //   await plugin.app.addTag("75px");
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
