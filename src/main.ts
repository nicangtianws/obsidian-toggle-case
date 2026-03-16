import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab} from "./settings";

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		// This adds a complex command that can check whether the current state of the app allows execution of the command
    this.addCommand({
      id: "toggle-case-selection",
      name: "切换选中文本大小写（全小写转大写，否则转小写）",
      hotkeys: [{ modifiers: ["Ctrl", "Shift"], key: "U" }],
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
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
