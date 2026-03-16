import {App, Editor, Modal, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, ToggleCasePluginSettings} from "./settings";

export default class ToggleCasePlugin extends Plugin {
	settings: ToggleCasePluginSettings;

	async onload() {
		await this.loadSettings();
    this.addCommand({
      id: "toggle-it-case",
      name: "切换选中文本大小写（全小写转大写，否则转小写）",
      // hotkeys: [{ modifiers: ["Ctrl", "Shift"], key: "U" }],
      editorCallback: (editor: Editor) => {
        const selectedText = editor.getSelection();

        let result: string = "";
        const isAllLower: boolean = selectedText === selectedText.toLowerCase();
        if (isAllLower) {
          result = selectedText.toUpperCase();
        } else {
          result = selectedText.toLowerCase();
        }

        editor.replaceSelection(`${result}`);
      },
    });

	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<ToggleCasePluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

