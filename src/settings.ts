import {App, PluginSettingTab, Setting} from "obsidian";
import ToggleCasePlugin from "./main";

export interface ToggleCasePluginSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: ToggleCasePluginSettings = {
	mySetting: 'default'
}

export class ToggleCasePluginSettingTab extends PluginSettingTab {
	plugin: ToggleCasePlugin;

	constructor(app: App, plugin: ToggleCasePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
