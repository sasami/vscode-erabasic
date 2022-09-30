import { CompletionItem, CompletionItemKind, CompletionItemTag, MarkdownString } from "vscode";

const Keyword = CompletionItemKind.Keyword;
const Control = CompletionItemKind.Keyword;
const Command = CompletionItemKind.Function;   // 命令と呼ばれてるもののうち、関数では無いもの
const Function = CompletionItemKind.Function;  // 関数と呼ばれてるもの (Emueraの仕様上、全ての式中関数は命令としても機能する)
const Variable = CompletionItemKind.Variable;

type NLSLocale = "ja" | "en";

class NLSCompletionItem extends CompletionItem {
    nlsDetail?: { [locale in NLSLocale]?: string };
    nlsDocumentation?: { [locale in NLSLocale]?: string | MarkdownString};
}

function localizedComplationItems(items: NLSCompletionItem[]): CompletionItem[] {
    const conf = process.env.VSCODE_NLS_CONFIG ? JSON.parse(process.env.VSCODE_NLS_CONFIG) : {};
    const locale = conf.locale || "en";
    return items.map((item) => {
        if (item.detail === undefined && item.nlsDetail !== undefined) {
            item.detail = item.nlsDetail[locale] || item.nlsDetail["ja"];
            delete item.nlsDetail;
        }
        if (item.documentation === undefined && item.nlsDocumentation !== undefined) {
            item.documentation = item.nlsDocumentation[locale] || item.nlsDocumentation["ja"];
            delete item.nlsDocumentation;
        }
        return item;
    });
}

// PRINT系を埋めて力尽きただけなので、気の向くまま埋めちゃって下されば取り込みます。
// もちろん、日本語だけ、英語だけ、detailなんか無くてもOK！
export const BuiltinComplationItems = localizedComplationItems([
    {
        label: "PRINT",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINT str value" },
        nlsDocumentation: { "ja": new MarkdownString("文字列を表示する命令です。\n\n*@param* `value` - 表示する文字列。\n\n"), "en": new MarkdownString("Show String\n\n*@param* `value`")},
    },
    {
        label: "PRINTL",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINTL str value" },
        nlsDocumentation: { "ja": new MarkdownString("文字列を表示し、改行する命令です。\n\n*@param* `value` - 表示する文字列。\n\n"), "en": new MarkdownString("Show String + Line Break\n\n*@param* `value`") },
    },
    {
        label: "PRINTW",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINTW str value" },
        nlsDocumentation: { "ja": new MarkdownString("文字列を表示し、`WAIT`命令による入力待ちにする命令です。\n\n*@param* `value` - 表示する文字列。\n\n"), "en": new MarkdownString("Show String + Wait\n\n*@param* `value`") },
    },
    {
        label: "PRINTK",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINTK str value" },
        nlsDocumentation: { "ja": new MarkdownString("`FORCEKANA`命令を適用し、文字列を表示する命令です。\n\n*@param* `value` - 表示する文字列。\n\n"), "en": new MarkdownString("Show String + Forced Kana\n\n*@param* `value`") },
    },
    {
        label: "PRINTKL",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINTKL str value" },
        nlsDocumentation: { "ja": new MarkdownString("`FORCEKANA`命令を適用し、文字列を表示し、改行する命令です。\n\n*@param* `value` - 表示する文字列。\n\n"), "en": new MarkdownString("Show String + Forced Kana + Line Break\n\n*@param* `value`") },
    },
    {
        label: "PRINTKW",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINTKW str value" },
        nlsDocumentation: { "ja": new MarkdownString("`FORCEKANA`命令を適用し、文字列を表示し、`WAIT`命令による入力待ちにする命令です。\n\n*@param* `value` - 表示する文字列。\n\n"), "en": new MarkdownString("Show String + Forced Kana + Wait\n\n*@param* `value`") },
    },
    {
        label: "PRINTD",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+初期色", "en": "Show String + Initial Color" },
    },
    {
        label: "PRINTDL",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+初期色+改行", "en": "Show String + Initial Color + Line Break" },
    },
    {
        label: "PRINTDW",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+初期色+待機", "en": "Show String + Initial Color + Wait" },
    },
    {
        label: "PRINTV",
        kind: Command,
        nlsDetail: { "ja": "数式を表示", "en": "Show Formula" },
    },
    {
        label: "PRINTVL",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+改行", "en": "Show Formula + Line Break" },
    },
    {
        label: "PRINTVW",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+待機", "en": "Show Formula + Wait" },
    },
    {
        label: "PRINTVK",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+カナ強制", "en": "Show Formula + Forced Kana" },
    },
    {
        label: "PRINTVKL",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+カナ強制+改行", "en": "Show Formula + Forced Kana + Line Break" },
    },
    {
        label: "PRINTVKW",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+カナ強制+待機", "en": "Show Formula + Forced Kana + Wait" },
    },
    {
        label: "PRINTVD",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+初期色", "en": "Show Formula + Initial Color" },
    },
    {
        label: "PRINTVDL",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+初期色+改行", "en": "Show Formula + Initial Color + Line Break" },
    },
    {
        label: "PRINTVDW",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+初期色+待機", "en": "Show Formula + Initial Color + Wait" },
    },
    {
        label: "PRINTS",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示", "en": "Display String Expression" },
    },
    {
        label: "PRINTSL",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+改行", "en": "Display String Expression + Line Break" },
    },
    {
        label: "PRINTSW",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+待機", "en": "Display String Expression + Wait" },
    },
    {
        label: "PRINTSK",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+カナ強制", "en": "Display String Expression + Forced Kana" },
    },
    {
        label: "PRINTSKL",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+カナ強制+改行", "en": "Display String Expression + Forced Kana + Line Break" },
    },
    {
        label: "PRINTSKW",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+カナ強制+待機", "en": "Display String Expression + Forced Kana + Wait" },
    },
    {
        label: "PRINTSD",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+初期色", "en": "Display String Expression + Initial Color" },
    },
    {
        label: "PRINTSDL",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+初期色+改行", "en": "Display String Expression + Initial Color + Line Break" },
    },
    {
        label: "PRINTSDW",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+初期色+待機", "en": "Display String Expression + Initial Color + Wait" },
    },
    {
        label: "PRINTFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示", "en": "Formatted Show String" },
    },
    {
        label: "PRINTFORML",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+改行", "en": "Formatted Show String + Line Break" },
    },
    {
        label: "PRINTFORMW",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+待機", "en": "Formatted Show String + Wait" },
    },
    {
        label: "PRINTFORMK",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+カナ強制", "en": "Formatted Show String + Forced Kana" },
    },
    {
        label: "PRINTFORMKL",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+カナ強制+改行", "en": "Formatted Show String + Forced Kana + Line Break" },
    },
    {
        label: "PRINTFORMKW",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+カナ強制+待機", "en": "Formatted Show String + Forced Kana + Wait" },
    },
    {
        label: "PRINTFORMD",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+初期色", "en": "Formatted Show String + Initial Color" },
    },
    {
        label: "PRINTFORMDL",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+初期色+改行", "en": "Formatted Show String + Initial Color + Line Break" },
    },
    {
        label: "PRINTFORMDW",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+初期色+待機", "en": "Formatted Show String + Initial Color + Wait" },
    },
    {
        label: "PRINTFORMS",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示", "en": "Formatted Display String Expression" },
    },
    {
        label: "PRINTFORMSL",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+改行", "en": "Formatted Display String Expression + Line Break" },
    },
    {
        label: "PRINTFORMSW",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+待機", "en": "Formatted Display String Expression + Wait" },
    },
    {
        label: "PRINTFORMSK",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+カナ強制", "en": "Formatted Display String Expression + Forced Kana" },
    },
    {
        label: "PRINTFORMSKL",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+カナ強制+改行", "en": "Formatted Display String Expression + Forced Kana + Line Break" },
    },
    {
        label: "PRINTFORMSKW",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+カナ強制+待機", "en": "Formatted Display String Expression + Forced Kana + Wait" },
    },
    {
        label: "PRINTFORMSD",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+初期色", "en": "Formatted Display String Expression + Initial Color" },
    },
    {
        label: "PRINTFORMSDL",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+初期色+改行", "en": "Formatted Display String Expression + Initial Color + Line Break" },
    },
    {
        label: "PRINTFORMSDW",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+初期色+待機", "en": "Formatted Display String Expression + Initial Color + Wait" },
    },
    {
        label: "PRINTSINGLE",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示", "en": "Show String" },
    },
    {
        label: "PRINTSINGLEK",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+カナ強制", "en": "Show String + Forced Kana" },
    },
    {
        label: "PRINTSINGLED",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+初期色", "en": "Show String + Initial Color" },
    },
    {
        label: "PRINTSINGLEV",
        kind: Command,
        nlsDetail: { "ja": "数式を表示", "en": "Show Formula" },
    },
    {
        label: "PRINTSINGLEVK",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+カナ強制", "en": "Show Formula + Forced Kana" },
    },
    {
        label: "PRINTSINGLEVD",
        kind: Command,
        nlsDetail: { "ja": "数式を表示+初期色", "en": "Show Formula + Initial Color" },
    },
    {
        label: "PRINTSINGLES",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示", "en": "Display String Expression" },
    },
    {
        label: "PRINTSINGLESK",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+カナ強制", "en": "Display String Expression + Forced Kana" },
    },
    {
        label: "PRINTSINGLESD",
        kind: Command,
        nlsDetail: { "ja": "文字列式を表示+初期色", "en": "Display String Expression + Initial Color" },
    },
    {
        label: "PRINTSINGLEFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示", "en": "Formatted Show String" },
    },
    {
        label: "PRINTSINGLEFORMK",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+カナ強制", "en": "Formatted Show String + Forced Kana" },
    },
    {
        label: "PRINTSINGLEFORMD",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+初期色", "en": "Formatted Show String + Initial Color" },
    },
    {
        label: "PRINTSINGLEFORMS",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示", "en": "Formatted Display String Expression" },
    },
    {
        label: "PRINTSINGLEFORMSK",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+カナ強制", "en": "Formatted Display String Expression + Forced Kana" },
    },
    {
        label: "PRINTSINGLEFORMSD",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列式を表示+初期色", "en": "Formatted Display String Expression + Initial Color" },
    },
    {
        label: "PRINTC",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+右揃え", "en": "Show String + Right Justified" },
    },
    {
        label: "PRINTCK",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+右揃え+カナ強制", "en": "Show String + Right Justified + Forced Kana" },
    },
    {
        label: "PRINTCD",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+右揃え+初期色", "en": "Show String + Right Justified + Initial Color" },
    },
    {
        label: "PRINTLC",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+左揃え", "en": "Show String + Left Justified" },
    },
    {
        label: "PRINTLCK",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+左揃え+カナ強制", "en": "Show String + Left Justified + Forced Kana" },
    },
    {
        label: "PRINTLCD",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+左揃え+初期色", "en": "Show String + Left Justified + Initial Color" },
    },
    {
        label: "PRINTFORMC",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+右揃え", "en": "Formatted Show String + Right Justified" },
    },
    {
        label: "PRINTFORMCK",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+右揃え+カナ強制", "en": "Formatted Show String + Right Justified + Forced Kana" },
    },
    {
        label: "PRINTFORMCD",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+右揃え+初期色", "en": "Formatted Show String + Right Justified + Initial Color" },
    },
    {
        label: "PRINTFORMLC",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+左揃え", "en": "Formatted Show String + Left Justified" },
    },
    {
        label: "PRINTFORMLCK",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+左揃え+カナ強制", "en": "Formatted Show String + Left Justified + Forced Kana" },
    },
    {
        label: "PRINTFORMLCD",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示+左揃え+初期色", "en": "Formatted Show String + Left Justified + Initial Color" },
    },
    {
        label: "DATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) DATA str value" },
        nlsDocumentation: { "ja": new MarkdownString("PRINTDATA系命令の候補となる文字列を指定する命令です。\n\n*@param* `value` - 表示する文字列。  \n*@see* - `PRINTDATA`, `STRDATA`, `DATAFORM`, `DATALIST`") },
    },
    {
        label: "DATAFORM",
        kind: Command,
        nlsDetail: { "ja": "(Command) DATAFORM str value" },
        nlsDocumentation: { "ja": new MarkdownString("PRINTDATA系命令の候補となる文字列を、書式付き文字列形式で指定する命令です。\n\n*@param* `value` - 表示する書式付き文字列。  \n*@see* - `PRINTDATA`, `STRDATA`") },
    },
    {
        label: "PRINTBUTTON",
        kind: Command,
        nlsDetail: { "ja": "ボタンを表示", "en": "Show Button" },
    },
    {
        label: "PRINTBUTTONC",
        kind: Command,
        nlsDetail: { "ja": "ボタンを表示+右揃え", "en": "Show Button + Right Justified" },
    },
    {
        label: "PRINTBUTTONLC",
        kind: Command,
        nlsDetail: { "ja": "ボタンを表示+左揃え", "en": "Show Button + Left Justified" },
    },
    {
        label: "PRINTPLAIN",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示", "en": "Show String" },
    },
    {
        label: "PRINTPLAINFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を表示", "en": "Formatted Show String" },
    },
    {
        label: "CUSTOMDRAWLINE",
        kind: Command,
        nlsDetail: { "ja": "横線を表示", "en": "Show Line" },
    },
    {
        label: "DRAWLINEFORM",
        kind: Command,
        nlsDetail: { "ja": "横線を表示", "en": "Show Line" },
    },
    {
        label: "REUSELASTLINE",
        kind: Command,
        nlsDetail: { "ja": "最終行を書き換え", "en": "Rewrite Last Line" },
    },
    {
        label: "PRINT_ABL",
        kind: Command,
        nlsDetail: { "ja": "キャラの能力を表示", "en": "Display Character's ABL" },
    },
    {
        label: "PRINT_TALENT",
        kind: Command,
        nlsDetail: { "ja": "キャラの素質を表示", "en": "Display Character's Talent" },
    },
    {
        label: "PRINT_MARK",
        kind: Command,
        nlsDetail: { "ja": "キャラの刻印を表示", "en": "Display Character's Stamp" },
    },
    {
        label: "PRINT_EXP",
        kind: Command,
        nlsDetail: { "ja": "キャラの経験を表示", "en": "Display Character's EXP" },
    },
    {
        label: "PRINT_PALAM",
        kind: Command,
        nlsDetail: { "ja": "キャラの調教中パラメータを表示", "en": "Display Character's PARAMS" },
    },
    {
        label: "PRINT_ITEM",
        kind: Command,
        nlsDetail: { "ja": "所持アイテムを表示", "en": "Display Possessed Items" },
    },
    {
        label: "PRINT_SHOPITEM",
        kind: Command,
        nlsDetail: { "ja": "販売アイテムを表示", "en": "Display Sales Items" },
    },
    {
        label: "UPCHECK",
        kind: Command,
        nlsDetail: { "ja": "調教中パラメータの変化を表示", "en": "Display changes in training parameters" },
    },
    {
        label: "DRAWLINE",
        kind: Command,
        nlsDetail: { "ja": "横線を表示", "en": "Show Line" },
    },
    {
        label: "CLEARLINE",
        kind: Command,
        nlsDetail: { "ja": "行を削除", "en": "Delete Line" },
    },
    {
        label: "PRINT_IMG",
        kind: Command,
        nlsDetail: { "ja": "画像を表示", "en": "Display IMG" },
    },
    {
        label: "PRINT_RECT",
        kind: Command,
        nlsDetail: { "ja": "矩形を表示", "en": "Display Rectangle" },
    },
    {
        label: "PRINT_SPACE",
        kind: Command,
        nlsDetail: { "ja": "空白を表示", "en": "Show Blank" },
    },
    {
        label: "SETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) SETCOLOR int R, int G, int B || SETCOLOR int color" },
        nlsDocumentation: { "ja": new MarkdownString("文字色を指定した色に変更する命令です。文字色の変更は`RESETCOLOR`命令が呼ばれるまで適用されたままになります。`0xRRGGBB`形式で一括指定することも可能です。\n\n*@param* `R` - 変更する文字色の赤成分。  \n*@param* `G` - 変更する文字色の緑成分。  \n*@param* `B` - 変更する文字色の青成分。\n\n*@param* `color` - 変更する文字色。`0xRRGGBB`形式\n\n*@example*\n\n```\nSETCOLOR 255, 128, 0\nSETCOLOR 0xFF8000\n```\n\n*@see* - `RESETCOLOR`, `SETCOLORBYNAME`, `GETCOLOR`, `GETDEFCOLOR`") },
    },
    {
        label: "RESETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) RESETCOLOR" },
        nlsDocumentation: { "ja": new MarkdownString("文字色をデフォルトの色に変更する命令です。\n\n*@see* - `SETCOLOR`, `GETDEFCOLOR`") },
    },
    {
        label: "SETBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) SETBGCOLOR int R, int G, int B || (Command) SETBGCOLOR int color" },
        nlsDocumentation: { "ja": new MarkdownString("背景色を指定した色に変更する命令です。背景色の変更は`RESETBGCOLOR`命令が呼ばれるまで適用されたままになります。`0xRRGGBB`形式で一括指定することも可能です。\n\n*@param* `R` - 変更する背景色の赤成分。  \n*@param* `G` - 変更する背景色の緑成分。  \n*@param* `B` - 変更する背景色の青成分。\n\n*@param* `color` - 変更する背景色。`0xRRGGBB`形式\n\n*@example*\n\n```\nSETBGCOLOR 255, 128, 0\nSETBGCOLOR 0xFF8000\n```\n\n*@see* - `RESETBGCOLOR`, `SETBGCOLORBYNAME`, `GETBGCOLOR`, `GETDEFBGCOLOR`") },
    },
    {
        label: "RESETBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) RESETBGCOLOR" },
        nlsDocumentation: { "ja": new MarkdownString("背景色をデフォルトの色に変更する命令です。\n\n*@see* - `SETBGCOLOR`, `GETDEFBGCOLOR`") },
    },
    {
        label: "SETCOLORBYNAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) SETCOLORBYNAME str colorName" },
        nlsDocumentation: { "ja": new MarkdownString("定義済み色名から文字色を指定する命令です。文字色の変更は`RESETCOLOR`命令が呼ばれるまで適用されたままになります。\n\n*@param* `colorName` - 変更する文字色の色名。定義済み色名の詳細は[KnownColor列挙体](http://msdn.microsoft.com/ja-jp/library/system.drawing.knowncolor%28v=VS.80%29.aspx)を参照  \n*@see* - `RESETCOLOR`") },
    },
    {
        label: "SETBGCOLORBYNAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) SETBGCOLORBYNAME str colorName" },
        nlsDocumentation: { "ja": new MarkdownString("定義済み色名から背景色を指定する命令です。背景色の変更は`RESETBGCOLOR`命令が呼ばれるまで適用されたままになります。\n\n*@param* `colorName` - 変更する背景色の色名。定義済み色名の詳細は[KnownColor列挙体](http://msdn.microsoft.com/ja-jp/library/system.drawing.knowncolor%28v=VS.80%29.aspx)を参照  \n*@see* - `RESETBGCOLOR`") },
    },
    {
        label: "GETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETCOLOR || (Function) int GETCOLOR()" },
        nlsDocumentation: { "ja": new MarkdownString("現在使用している文字色コードを取得します。戻り値は16進数で0xRRGGBBとなります。\n\n*@return* 現在の文字色  \n*@see* - `SETCOLOR`") },
    },
    {
        label: "GETDEFCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETDEFCOLOR || (Function) int GETDEFCOLOR()" },
        nlsDocumentation: { "ja": new MarkdownString("コンフィグで指定しているデフォルトの文字色コードを取得します。戻り値は16進数で0xRRGGBBとなります。\n\n*@return* デフォルトの文字色") },
    },
    {
        label: "GETBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETBGCOLOR || (Function) int GETBGCOLOR()" },
        nlsDocumentation: { "ja": new MarkdownString("現在使用している背景色コードを取得します。戻り値は16進数で0xRRGGBBとなります。\n\n*@return* 現在の背景色") },
    },
    {
        label: "GETDEFBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETDEFBGCOLOR || (Function) int GETDEFBGCOLOR()" },
        nlsDocumentation: { "ja": new MarkdownString("コンフィグで指定しているデフォルトの背景色コードを取得します。戻り値は16進数で0xRRGGBBとなります。\n\n*@return* デフォルトの背景色") },
    },
    {
        label: "GETFOCUSCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETFOCUSCOLOR || (Function) int GETFOCUSCOLOR()" },
        nlsDocumentation: { "ja": new MarkdownString("コンフィグで指定している選択中の文字色コードを取得します。戻り値は16進数で0xRRGGBBとなります。\n\n*@return* 選択中の文字色") },
    },
    {
        label: "FONTBOLD",
        kind: Command,
        nlsDetail: { "ja": "(Command) FONTBOLD" },
        nlsDocumentation: { "ja": new MarkdownString("文字スタイルを太字に変更する命令です。文字スタイルの変更は`FONTREGULAR`命令が呼ばれるまで適用されたままになります。\n\n*@see* - `FONTREGULAR`, `FONTITALIC`, `FONTSTYLE`") },
    },
    {
        label: "FONTITALIC",
        kind: Command,
        nlsDetail: { "ja": "(Command) FONTITALIC" },
        nlsDocumentation: { "ja": new MarkdownString("文字スタイルを斜体に変更する命令です。文字スタイルの変更は`FONTREGULAR`命令が呼ばれるまで適用されたままになります。\n\n*@see* - `FONTREGULAR`, `FONTBOLD`, `FONTSTYLE`") },
    },
    {
        label: "FONTREGULAR",
        kind: Command,
        nlsDetail: { "ja": "(Command) FONTREGULAR" },
        nlsDocumentation: { "ja": new MarkdownString("文字スタイルを通常に戻す命令です。\n\n*@see* - `FONTBOLD`, `FONTITALIC`, `FONTSTYLE`") },
    },
    {
        label: "FONTSTYLE",
        kind: Command,
        nlsDetail: { "ja": "(Command) FONTREGULAR int style" },
        nlsDocumentation: { "ja": new MarkdownString("文字スタイルを指定したスタイルに変更する命令です。\n\n*@param* `style` - 指定するスタイル。ビットごとに組み合わせることができます。\n\n- 0:通常\n- 1:太字\n- 2:斜体\n- 4:打消し線\n- 8:下線\n\n*@example*\n```\nFONTSTYLE 1 + 2\nPRINTL 太字＋斜体\nFONTSTYLE 5\nPRINTL 太字＋打ち消し\nFONTITALIC\nPRINTL 太字＋斜体＋打ち消し\nFONTSTYLE 0\nPRINTL 通常\n```\n\n*@see* - `FONTBOLD`, `FONTITALIC`, `FONTREGULAR`") },
    },
    {
        label: "GETSTYLE",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETSTYLE || (Function) int GETSTYLE()" },
        nlsDocumentation: { "ja": new MarkdownString("現在の文字スタイルを取得します。STYLE系命令が行われていない時は0を返します。\n\n*@return* - 文字スタイル\n\n- 0:通常\n- 1:太字\n- 2:斜体\n- 4:打消し線\n- 8:下線\n\n*@see* - `FONTSTYLE`") },
    },
    {
        label: "CHKFONT",
        kind: Command,
        nlsDetail: { "ja": "(Command) CHKFONT str fontName || (Function) int CHKFONT(str fontName)" },
        nlsDocumentation: { "ja": new MarkdownString("指定された名前のフォントがインストールされているかどうかを調べます。\n\n*@param* {文字列式} `fontName` 確認するフォント名  \n*@return* - \n\n- 0:フォントがインストールされていない\n- 1:フォントがインストールされている\n\n*@see* - `SETFONT`") },
    },
    {
        label: "SETFONT",
        kind: Command,
        nlsDetail: { "ja": "(Command) SETFONT str fontName" },
        nlsDocumentation: { "ja": new MarkdownString("以降の文字列表示に指定された名前のフォントを用いる命令です。インストールされていない可能性があるフォントを指定する場合はSETFONTの前にCHKFONT命令を行ってください。\n\n*@param* {文字列式} `fontName` 使用するフォント名\n\n- 引数を省略、または空文字列を指定した場合、emuera.configに指定された標準のフォントに戻します。\n- 指定されたフォントがインストールされていない場合、代わりに\"Microsoft Sans Serif\"が使用されます。\n\n*@example*\n\n```\nPRINTL abc123あいう(標準フォント)\nCHKFONT \"ＭＳ Ｐゴシック\"\nIF RESULT\n\tSETFONT \"ＭＳ Ｐゴシック\"\n\tPRINTL abc123あいう(ＭＳ Ｐゴシック)\nENDIF\nCHKFONT \"ＭＳ 明朝\"\nIF RESULT\n\tSETFONT \"ＭＳ 明朝\"\n\tPRINTL abc123あいう(ＭＳ 明朝)\nENDIF\nSTR:0 = ＭＳ Ｐ明朝\nCHKFONT STR:0\nIF RESULT\n\tSETFONT STR:0\n\tPRINTL abc123あいう(ＭＳ Ｐ明朝)\nENDIF\nSETFONT\n```\n\n*@see* - `CHKFONT`") },
    },
    {
        label: "GETFONT",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETFONT || (Function) str GETFONT()" },
        nlsDocumentation: { "ja": new MarkdownString("現在使用しているフォントの名前を取得します。これはSETFONT命令で指定した名前と同じです。SETFONT命令が行われていない時はemuera.configで指定されている標準のフォントの名前を取得します。\n\n*@returns* 現在使用しているフォント名  \n*@see* - `SETFONT`") },
    },
    {
        label: "FORCEKANA",
        kind: Command,
        nlsDetail: { "ja": "(Command) FORCEKANA int value" },
        nlsDocumentation: { "ja": new MarkdownString("表示命令のひらがな・カタカナを指定します。キーワード\"K\"を含む各種PRINT系命令で有効になります。\n\n*@param* `value` - 変換する内容\n\n- 0:変換を行わない\n- 1:ひらがな→カタカナ\n- 2:カタカナ→ひらがな（全角のみ）\n- 3:カタカナ→ひらがな（全角・半角両方とも）") },
    },
    {
        label: "ALIGNMENT",
        kind: Command,
        nlsDetail: { "ja": "(Command) ALIGNMENT str keyword" },
        nlsDocumentation: { "ja": new MarkdownString("以降の文字列表示を指定した位置に揃えます。通常の表示は`ALIGNMENT LEFT`であり、左端に揃えられます。ALIGNMENTが適用されるのは改行された時点です。\n\n*@param* {\"LEFT\"|\"CENTER\"|\"RIGHT\"} `keyword` - 文字列の表示位置  \n*@example*\n\n```\nALIGNMENT RIGHT\nPRINT あああ\nALIGNMENT CENTER\nPRINTL いいい\nALIGNMENT LEFT\n```\n\nこのようにすると、\"あああいいい\"という文字列が中央揃えで表示されます。") },
    },
    {
        label: "CURRENTALIGN",
        kind: Command,
        nlsDetail: { "ja": "(Command) CURRENTALIGN || (Function) str CURRENTALIGN()" },
        nlsDocumentation: { "ja": new MarkdownString("現在のALIGNMENTを取得します。返値はALIGNMENT命令で指定した文字列と同じです（大文字）。ALIGNMENT命令が行われていない時は初期値のLEFTを返します。\n\n*@return* - 現在のALIGNMENT  \n*@see* - `ALIGNMENT`") },
    },
    {
        label: "REDRAW",
        kind: Command,
        nlsDetail: { "ja": "(Command) REDRAW int mode" },
        nlsDocumentation: { "ja": new MarkdownString("描画の制御タイミングを変更する命令です。デフォルトは1です。\n\n*@param* `mode` - 描画モード。ビット指定\n\n- 0:ユーザーが入力を必要とするタイミングでのみ描画を行うようにします。\n- 1:通常通り、コンフィグの\"フレーム毎秒\"で指定されたタイミングで描画を行います。\n- 2: 上記の効果に加え、REDRAW命令を行った瞬間に強制的に描画を行います。") },
    },
    {
        label: "CURRENTREDRAW",
        kind: Command,
        nlsDetail: { "ja": "(Command) CURRENTREDRAW || (Function) int CURRENTREDRAW()" },
        nlsDocumentation: { "ja": new MarkdownString("現在のREDRAW状態を取得します。返値は通常時は1、REDRAW命令を用いて描画を抑制した時は0になります。\n\n*@return* - 現在のREDRAW状態  \n*@see* - `REDRAW`") },
    },
    {
        label: "PRINTCPERLINE",
        kind: Command,
        nlsDetail: { "ja": "(Command) PRINTCPERLINE || (Function) int PRINTCPERLINE()" },
        nlsDocumentation: { "ja": new MarkdownString("コンフィグ\"PRINTCを並べる数\"で指定された数を取得します。標準は3です。\n\n*@return* - PRINTCを並べる数  \n*@see* - `PRINTC`") },
    },
    {
        label: "LINEISEMPTY",
        kind: Command,
        nlsDetail: { "ja": "(Command) LINEISEMPTY || (Function) int LINEISEMPTY()" },
        nlsDocumentation: { "ja": new MarkdownString("現在PRINTしている行が空行かどうかを調べます。この関数を呼び出した時点で`PRINTL `を行おうとした場合、その結果がただの空行になる場合には1が、そうでない場合は0が返ります。PRINTC系で条件に応じたボタンを順次書き連ねる場合に、最後にこの関数を使用することで、表示されるボタンがあるかないかを判別し、なければ専用の表示をするといったことが可能です。\n\n*@return* - 現在の行が空行か\n\n- 0:空行ではない\n- 1:空行である\n\n*@see* - `PRINTC`") },
    },
    {
        label: "BARSTR",
        kind: Command,
        nlsDetail: { "ja": "(Command) BARSTR int value, int max, int length || (Function) str BARSTR(int value, int max, int length)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "グラフの文字列表示を取得します。\n\n"+
            "*@param* `value` - 値  \n"+
            "*@param* `max` - 最大値  \n"+
            "*@param* `length` - グラフの長さ  \n"+
            "*@returns* - グラフの文字列  \n"+
            "*@example*\n\n"+
            "```\n"+
            "BARSTR(500, 1000, 20)\n"+
            ";=>\"[**********..........]\"\n"+
            "```"
            ) },
    },
    {
        label: "MONEYSTR",
        kind: Command,
        nlsDetail: { "ja": "(Command) MONEYSTR int value, str format=\"\" || (Function) str MONEYSTR(int value, str format=\"\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "引数で与えられた数値に対して、設定されたお金の単位を付けた文字列を取得します。単位の前置・後置も自動的に処理します。第2引数はTOSTR命令と同様の数値の文字列化における変換書式指定子となります。\n\n"+
            "*@param* `value` - 値  \n"+
            "*@param* `format` - 書式指定子  \n"+
            "*@returns* - 文字列  \n"+
            "*@see* - `TOSTR`"+
            "") },
    },
    {
        label: "SKIPDISP",
        kind: Command,
        nlsDetail: { "ja": "(Command) SKIPDISP int isSkip" },
        nlsDocumentation: { "ja": new MarkdownString(
            "PRINT等の画面出力命令およびWAIT、TWAITなどの命令を無視するフラグを設定する命令です。\n\n"+
            "*@param* `isSkip` - フラグ\n\n"+
            "- 0:無視しないようにする\n"+
            "- 1:無視するようにする\n\n"+
            "*@return* - 引数にかかわらず `RESULT:0 = 0`  \n"+
            "*@see* - 注意点、詳細は[Emuera wiki](https://ja.osdn.net/projects/emuera/wiki/excom#h5-SKIPDISP.20.3C.E6.95.B0.E5.80.A4.3E)を参照"+
            "") },
    },
    {
        label: "ISSKIP",
        kind: Command,
        nlsDetail: { "ja": "(Command) ISSKIP || (Function) int ISSKIP()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "SKIPDISPのフラグを取得します。\n\n"+
            "*@return* - スキップフラグ\n\n"+
            "- 0:スキップしない\n"+
            "- 1:スキップする\n\n"+
            "*@see* - `SKIPDISP`"+
            "") },
    },
    {
        label: "MOUSESKIP",
        kind: Command,
        nlsDetail: { "ja": "(Command) MOUSESKIP" },
        nlsDocumentation: { "ja": new MarkdownString(
            "右クリックが押されてWAITスキップの状態になっているかを取得します\nマクロ処理時のスキップ中は0を返します\nマクロ処理のスキップと右クリックが競合した場合はマクロを優先し0を返します\n\n"+
            "*@return* - スキップフラグ\n\n"+
            "- 0:スキップしていない\n"+
            "- 1:スキップしている\n\n"+
            "*@see* - `MESSKIP`"+
            "") },
    },
    {
        label: "TOUPPER",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOUPPER str value || (Function) str TOUPPER(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "入力文字列のアルファベットを大文字にした結果を習得します。\n\n"+
            "*@returns* - 変換した文字列\n\n"+
            "") },
    },
    {
        label: "TOLOWER",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOLOWER str value || (Function) str TOLOWER(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "入力文字列のアルファベットを小文字にした結果を習得します。\n\n"+
            "*@returns* - 変換した文字列\n\n"+
            "") },
    },
    {
        label: "TOHALF",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOHALF str value || (Function) str TOHALF(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "入力文字列の全角文字を半角文字にした結果を習得します。対応する半角文字がない全角文字はそのままです。\n\n"+
            "*@returns* - 変換した文字列\n\n"+
            "") },
    },
    {
        label: "TOFULL",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOFULL str value || (Function) str TOFULL(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "入力文字列の半角文字を全角文字にした結果を習得します。\n\n"+
            "*@returns* - 変換した文字列\n\n"+
            "") },
    },
    {
        label: "TOSTR",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOSTR int value, str format = \"\" || (Function) str TOSTR(int value, str format = \"\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値を文字列に変換する命令です。変換したい数字を第一引数に、変換の書式を文字列で第二引数に指定します。第二引数は省略できますが、省略した場合はPRINTFORMの{}内などと同じように単に文字列になります。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@param* `format` - 変換の書式  \n"+
            "*@returns* - 変換した文字列  \n"+
            "*@example*\n\n"+
            "```\n"+
            "A = 438765\n"+
            "PRINTSL TOSTR(A)\n"+
            ";438765\n"+
            "PRINTSL TOSTR(A, \"x\")\n"+
            ";6b1ed 16進数(小文字)\n"+
            "PRINTSL TOSTR(A, \"X\")\n"+
            ";6B1ED 16進数(大文字)\n"+
            "PRINTSL TOSTR(A, \"D8\")\n"+
            ";00438765 10進数 + 8桁\n"+
            "PRINTSL TOSTR(A, \"X8\")\n"+
            ";0006B1ED 16進数 + 8桁\n"+
            "PRINTSL TOSTR(A, \"00000000\")\n"+
            ";00438765 10進数 + 8桁\n"+
            "PRINTSL TOSTR(A, \"########\")\n"+
            ";438765 10進数\n"+
            "PRINTSL TOSTR(A, \"#,###\")\n"+
            ";438,765 3桁ごとに\",\"\n"+
            "PRINTSL TOSTR(A, \"0000万0000\")\n"+
            ";0043万8765 8桁 + 4桁目に\"万\"\n"+
            "```"+
            "") },
    },
    {
        label: "ISNUMERIC",
        kind: Command,
        nlsDetail: { "ja": "(Command) ISNUMERIC str value || (Function) int ISNUMERIC(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列を数値としてパース可能か（TOINTで値を取れるか）を判断します。\n\n"+
            "*@param* {文字列式} `value` - 検査する文字列\n\n"+
            "*@return* - \n\n"+
            "- 0:パース不可\n"+
            "- 1:パース可能\n"+
            "") },
    },
    {
        label: "TOINT",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOINT str value || (Function) int TOINT(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "引数文字列を数値化して取得します。ただし、半角数字で構成された文字列のみ数値化できます。引数を数値として解釈できない場合、0が代入されます。全角数字の場合も同様です。\n\n"+
            "*@param* {文字列式} `value` - 数値化する文字列\n\n"+
            "*@return* - 変換した数値\n\n"+
            "") },
    },
    {
        label: "STRLEN",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRLEN str value || (Function) int STRLEN(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の長さを取得します。長さはSHIFT-JISでのバイト数です。つまり全角文字を2文字と数えます。\n\n"+
            "*@param* {文字列} `value` - 文字列\n\n"+
            "*@return* - 長さ\n\n"+
            "") },
    },
    {
        label: "STRLENU",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRLENU str value || (Function) int STRLENU(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の長さを取得します。全角文字も1文字と数えます。\n\n"+
            "*@param* {文字列} `value` - 文字列\n\n"+
            "*@return* - 長さ\n\n"+
            "") },
    },
    {
        label: "STRLENS",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRLENS str value || (Function) int STRLENS(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の長さを取得します。長さはSHIFT-JISでのバイト数です。つまり全角文字を2文字と数えます。\n\n"+
            "*@param* {文字列式} `value` - 文字列\n\n"+
            "*@return* - 長さ\n\n"+
            "") },
    },
    {
        label: "STRLENSU",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRLENSU str value || (Function) int STRLENSU(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の長さを取得します。全角文字も1文字と数えます。\n\n"+
            "*@param* {文字列式} `value` - 文字列\n\n"+
            "*@return* - 長さ\n\n"+
            "") },
    },
    {
        label: "STRLENFORM",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRLENFORM str value || (Function) int STRLENFORM(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の長さを取得します。長さはSHIFT-JISでのバイト数です。つまり全角文字を2文字と数えます。\n\n"+
            "*@param* {書式付き文字列} `value` - 文字列\n\n"+
            "*@return* - 長さ\n\n"+
            "") },
    },
    {
        label: "STRLENFORMU",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRLENFORMU str value || (Function) int STRLENFORMU(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の長さを取得します。全角文字も1文字と数えます。\n\n"+
            "*@param* {書式付き文字列} `value` - 文字列\n\n"+
            "*@return* - 長さ\n\n"+
            "") },
    },
    {
        label: "SUBSTRING",
        kind: Command,
        nlsDetail: { "ja": "(Command) SUBSTRING str value, int start, int length || (Function) str SUBSTRING(str value, int start = 0, int length = -1)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定された文字列の部分文字列を返します。startが0でない場合、指定された位置以降の文字列を返します。lengthが負の値でない場合、指定された長さの文字列を返します。いずれもSHIFT-JISでのバイト数です。つまり全角文字を2文字と数えます。\n\n"+
            "*@param* {文字列式} `value` - 文字列\n\n"+
            "*@param* `start` - 取得する文字列の開始位置\n\n"+
            "*@param* `length` - 取得する文字列の長さ。負の値を指定した場合、開始位置から最後までの文字列を返します。\n\n"+
            "*@returns* - 部分文字列\n\n"+
            "") },
    },
    {
        label: "SUBSTRINGU",
        kind: Command,
        nlsDetail: { "ja": "(Command) SUBSTRINGU str value, int start, int length || (Function) str SUBSTRINGU(str value, int start = 0, int length = -1)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定された文字列の部分文字列を返します。startが0でない場合、指定された位置以降の文字列を返します。lengthが負の値でない場合、指定された長さの文字列を返します。全角文字を1文字と数えます。\n\n"+
            "*@param* {文字列式} `value` - 文字列\n\n"+
            "*@param* `start` - 取得する文字列の開始位置\n\n"+
            "*@param* `length` - 取得する文字列の長さ。負の値を指定した場合、開始位置から最後までの文字列を返します。\n\n"+
            "*@returns* - 部分文字列\n\n"+
            "") },
    },
    {
        label: "CHARATU",
        kind: Command,
        nlsDetail: { "ja": "(Command) CHARATU str value, int position || (Function) str CHARATU(str value, int position)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定された文字列の任意の位置の文字を返します。全角文字を1文字と数えます。\n\n"+
            "*@param* {文字列式} `value` - 文字列\n\n"+
            "*@param* `position` - 取得する文字の位置\n\n"+
            "*@returns* - 文字\n\n"+
            "") },
    },
    {
        label: "STRFIND",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRFIND str target, str find, int start = 0 || (Function) int STRFIND(str target, str find, int start = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列検索命令です。第一引数には検索される対象の文字列を文字列式で、第二引数には検索する文字列を文字列式で指定します。全角文字を2文字と数え、0から始まるインデックスを取得します。見つからなかった場合は-1です。\n\n"+
            "*@param* {文字列式} `target` - 検索される対象の文字列\n\n"+
            "*@param* {文字列式} `find` - 検索する文字列\n\n"+
            "*@param* `start` - 検索の開始位置\n\n"+
            "*@return* - インデックス\n\n"+
            "") },
    },
    {
        label: "STRFINDU",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRFINDU str target, str find, int start = 0 || (Function) int STRFINDU(str target, str find, int start = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列検索命令です。第一引数には検索される対象の文字列を文字列式で、第二引数には検索する文字列を文字列式で指定します。全角文字を1文字と数え、0から始まるインデックスを取得します。見つからなかった場合は-1です。\n\n"+
            "*@param* {文字列式} `target` - 検索される対象の文字列\n\n"+
            "*@param* {文字列式} `find` - 検索する文字列\n\n"+
            "*@param* `start` - 検索の開始位置\n\n"+
            "*@return* - インデックス\n\n"+
            "") },
    },
    {
        label: "STRCOUNT",
        kind: Command,
        nlsDetail: { "ja": "(Command) STRCOUNT str target, str find || (Function) int STRCOUNT(str target, str find)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列中の指定部分文字列の数を取得する命令です。検索文字列の書式はC#の正規表現の仕様に準じます。\n\n"+
            "*@param* {文字列式} `target` - 検索される対象の文字列\n\n"+
            "*@param* {文字列式} `find` - 検索する文字列\n\n"+
            "*@return* - 一致した数\n\n"+
            "") },
    },
    {
        label: "SPLIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) SPLIT str target, str separator, str[] strs" },
        nlsDocumentation: { "ja": new MarkdownString(
            "第1引数で指定した文字列を、第2引数で指定した文字列を区切りとして分割し、第3引数で指定した文字列配列変数に代入します。また、分割した数をRESULTに代入します。第3引数で指定する変数は配列変数でなければなりません。分割後の要素数が第3引数に代入可能な要素数を超えた分については代入が行われません。\n\n"+
            "*@param* {文字列式} `target` - 分割する対象の文字列\n\n"+
            "*@param* {文字列式} `separator` - 区切り文字列\n\n"+
            "*@param* {文字列配列変数} `strs` - 検索する文字列\n\n"+
            "*@return* - 分割した数\n\n"+
            "") },
    },
    {
        label: "REPLACE",
        kind: Command,
        nlsDetail: { "ja": "(Command) REPLACE str source, str match, str newvalue || (Function) str REPLACE(str source, str match, str newvalue)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "置換対象文字列を置換対象パターンで検索し、ヒットしたら置換後の文字列で置き換えた結果を取得します。内部処理は正規表現です。第2引数はC#の正規表現の仕様に準じて動作します。そのため、()や[]、$、/.*+等の正規表現で用いられる記号はエスケープ必須となります。\n\n"+
            "*@param* {文字列式} `source` - 分割する対象の文字列\n\n"+
            "*@param* {文字列式} `match` - 区切り文字列\n\n"+
            "*@param* {文字列配列変数} `strs` - 検索する文字列\n\n"+
            "*@return* - 分割した数\n\n"+
            "") },
    },
    {
        label: "ESCAPE",
        kind: Command,
        nlsDetail: { "ja": "(Command) ESCAPE str value || (Function) str ESCAPE(str value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "正規表現用にエスケープした文字列を取得する。\n\n"+
            "*@param* `value` - 文字列\n\n"+
            "*@returns* - エスケープした文字列\n\n"+
            "") },
    },
    {
        label: "UNICODE",
        kind: Command,
        nlsDetail: { "ja": "(Command) UNICODE int value || (Function) str UNICODE(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字コードに対応したunicodeの文字を取得する命令です。ただし、この関数ではサロゲートペアを扱うことはできません。\n\n"+
            "*@param* `value` - 文字コード\n\n"+
            "*@returns* - unicode文字\n\n"+
            "") },
    },
    {
        label: "ENCODETOUNI",
        kind: Command,
        nlsDetail: { "ja": "(Command) ENCODETOUNI str value || (Function) int ENCODETOUNI(str value, int position = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Command)与えられた文字列をユニコードにエンコードしてそのバイトを数値として取得する。\n\n"+
            "*@param* {書式付き文字列} `value` - 対象文字列  \n"+
            "*@return* - \n\n"+
            "- RESULT:0 文字数\n"+
            "- RESULT:1 ～ バイト数値\n\n"+
            "(Function)文字列の対象位置の文字をユニコードのコード値で取得する。\n\n"+
            "*@param* `value` - 参照文字列  \n"+
            "*@param* `position` - 対象文字位置  \n"+
            "*@return* - コード値\n"+
            "") },
    },
    {
        label: "POWER",
        kind: Command,
        nlsDetail: { "ja": "(Command) POWER int variable, int x, int y || (Function) int POWER(int x, int y)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Command)`x`の`y`乗を計算し変数に代入します。\n\n"+
            "*@param* {数値型変数} `variable` - 格納先変数  \n"+
            "*@param* `x` - 底  \n"+
            "*@param* `y` - 指数  \n\n"+
            "(Function)`x`の`y`乗を計算します。\n\n"+
            "*@param* `x` - 底  \n"+
            "*@param* `y` - 指数  \n"+
            "*@return* - 累乗の計算結果\n"+
            "") },
    },
    {
        label: "ABS",
        kind: Command,
        nlsDetail: { "ja": "(Command) ABS int value || (Function) int ABS(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値の絶対値を返します。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 数値の絶対値\n"+
            "") },
    },
    {
        label: "SIGN",
        kind: Command,
        nlsDetail: { "ja": "(Command) SIGN int value || (Function) int SIGN(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値の符号を返します。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 符号\n\n"+
            "- -1:負\n"+
            "- 0:0\n"+
            "- 1:正\n"+
            "") },
    },
    {
        label: "SQRT",
        kind: Command,
        nlsDetail: { "ja": "(Command) SQRT int value || (Function) int SQRT(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値の平方根を返します。端数は切り捨てます。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 平方根\n\n"+
            "") },
    },
    {
        label: "GETBIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETBIT int n, int m || (Function) int GETBIT(int n, int m)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "引数の特定のビットを取得します。\n\n"+
            "*@param* `n` - 対象の数値  \n"+
            "*@param* `m` - ビットの位置。0～63まで  \n"+
            "*@return* - 指定したビットの値  \n"+
            "*@example*\n\n"+
            "```\n"+
            "A = GETBIT(X, 5)\n"+
            "B = (X & 1p5) != 0\n"+
            ";A == B\n"+
            "```\n"+
            "") },
    },
    {
        label: "MAX",
        kind: Command,
        nlsDetail: { "ja": "(Command) MAX int n, int m, ... || (Function) int MAX(int n, int m, ...)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定された数値のうち、最大の数値を返します。\n\n"+
            "*@param* `n` - 対象の数値  \n"+
            "*@return* - 引数の中で最大の値"+
            "") },
    },
    {
        label: "MIN",
        kind: Command,
        nlsDetail: { "ja": "(Command) MIN int n, int m, ... || (Function) int MIN(int n, int m, ...)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定された数値のうち、最小の数値を返します。\n\n"+
            "*@param* `n` - 対象の数値  \n"+
            "*@return* - 引数の中で最小の値"+
            "") },
    },
    {
        label: "LIMIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) LIMIT int value, int min, int max || (Function) int LIMIT(int value, int min, int max)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`value`の値を返します。ただし、`value`が`min`より小さいなら`min`を、`max`より大きいなら`max`を返します。\n\n"+
            "*@param* `value` - 対象の数値  \n"+
            "*@param* `min` - 最低値  \n"+
            "*@param* `max` - 最大値  \n"+
            "*@return* - valueの値"+
            "") },
    },
    {
        label: "INRANGE",
        kind: Command,
        nlsDetail: { "ja": "(Command) INRANGE int value, int min, int max || (Function) int INRANGE(int value, int min, int max)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`value`の値が`min`より大きく、`max`より小さいかを調べます。\n\n"+
            "*@param* `value` - 対象の数値  \n"+
            "*@param* `min` - 最低値  \n"+
            "*@param* `max` - 最大値  \n"+
            "*@return* - \n\n"+
            "- 0:`value`が範囲外\n"+
            "- 1:`value`が範囲内に収まっている"+
            "") },
    },
    {
        label: "SETBIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) SETBIT int variable, int position1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "変数の指定した位置のビットを1にします。\n\n"+
            "*@param* {数値型変数} `variable` - 対象の変数  \n"+
            "*@param* `position1` - ビットの位置  \n"+
            "") },
    },
    {
        label: "CLEARBIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) CLEARBIT int variable, int position1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "変数の指定した位置のビットを0にします。\n\n"+
            "*@param* {数値型変数} `variable` - 対象の変数  \n"+
            "*@param* `position1` - ビットの位置  \n"+
            "") },
    },
    {
        label: "INVERTBIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) INVERTBIT int variable, int position1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "変数の指定した位置のビットを反転します。\n\n"+
            "*@param* {数値型変数} `variable` - 対象の変数  \n"+
            "*@param* `position1` - ビットの位置  \n"+
            "") },
    },
    {
        label: "ADDCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) ADDCHARA int CSVNo1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したキャラ番号のキャラを追加します。\n\n"+
            "*@param* `CSVNo1` - CSVで指定されているキャラ番号  \n"+
            "") },
    },
    {
        label: "DELCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) DELCHARA int id1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した登録番号のキャラを削除します。\n\n"+
            "*@param* `id1` - キャラの登録番号  \n"+
            "") },
    },
    {
        label: "SWAPCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) SWAPCHARA int id1, int id2" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したキャラの登録番号を入れ替えます。\n\n"+
            "*@param* `id1` - キャラの登録番号  \n"+
            "*@param* `id2` - キャラの登録番号  \n"+
            "") },
    },
    {
        label: "SORTCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) SORTCHARA {int | str} charaVariable = NO, int order = FORWARD" },
        nlsDocumentation: { "ja": new MarkdownString(
            "任意のキーでキャラリストをソートします。MASTERはソートの対象になりません。TARGET:0、ASSI:0は自動で追尾されます。\n\n"+
            "*@param* {キャラクタ変数} `charaVariable` - キーとするキャラクタ変数  \n"+
            "*@param* {FORWARD | BACK} `order` - ソートの方向。FORWARDが昇順  \n"+
            "") },
    },
    {
        label: "GETCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETCHARA int CSVNo | (Function) int GETCHARA(int CSVNo)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "所有しているキャラの中に、指定したキャラ番号のキャラがいるかを調べます。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@return* - キャラの登録番号。いなければ`-1`  \n"+
            "") },
        },
    {
        label: "ADDDEFCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) ADDDEFCHARA" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ゲーム開始時のシステム的なキャラ追加処理を行う命令です。"+
            "chara0*.csvで定義されたキャラと、gamebase.csvで指定された初期キャラを追加します。"+
            "`ADDCHARA 0`はキャラNOが0であるキャラを探して追加しますが、ADDDEFCHARAはcsvの番号でキャラを追加します。"+
            "該当するcsvが存在しない場合、ADDVOIDCHARA同様に空のキャラクタを作成します。"+
            "これはeramakerの初期化処理を再現するための命令であり、@SYSTEM_TITLE以外では使用できません。\n\n"+
            "") },
    },
    {
        label: "ADDVOIDCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) ADDVOIDCHARA" },
        nlsDocumentation: { "ja": new MarkdownString(
            "csvに依らずにキャラを追加する命令です。"+
            "ADDVOIDCHARAで追加されたキャラは全ての変数に0又は\"\"(空文字列)が代入されています。"+
            "") },
    },
    {
        label: "DELALLCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) DELALLCHARA" },
        nlsDocumentation: { "ja": new MarkdownString(
            "登録されている全てのキャラクタを削除します。"+
            "") },
    },
    {
        label: "PICKUPCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) PICKUPCHARA int id1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "引数で指定したキャラのみを残し、他のキャラを全て削除する命令です。`MASTER:0`、`TARGET:0`、`ASSI:0`などは自動で追随します。命令後手動で設定し直す必要はありません。対象キャラに負の値を指定した場合エラーになりますが、MASTER、TARGET、ASSI等を対象に設定し、その結果それらの変数の中身が負の値だった場合は、例外でエラーになりません（無視される）。\n\n"+
            "*@param* `id1` - キャラの登録番号  \n"+
            "") },
    },
    {
        label: "EXISTCSV",
        kind: Command,
        nlsDetail: { "ja": "(Command) EXISTCSV int CSVNo | (Function) EXISTCSV(int CSVNo)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "対応するキャラが定義されているかどうかをチェックします。`ADDCHARA no`がエラーにならずに実行できるかどうかを調べることができます。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@return* - \n\n"+
            "- 0:キャラが定義されていない\n"+
            "- 1:キャラが定義されている"+
            "") },
    },
    {
        label: "FINDCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) FINDCHARA {int | str} charaVariable, {int | str} value, int start = 0, int end = *** | (Function) int FINDCHARA({int | str} charaVariable, {int | str} value, int start = 0, int end = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "キャラクタ変数とその値を指定し、変数がその値である最初のキャラクタの登録番号を返します。見つからなかった場合は-1を返します。start以上end未満の登録番号のキャラを検索範囲とします。ただし、検索範囲がキャラクタ数の範囲を超える場合はエラーとなります。 \n\n"+
            "*@param* {キャラクタ変数} `charaVariable` - キーとするキャラクタ変数  \n"+
            "*@param* `value` - 検索する値  \n"+
            "*@param* `start` - 検索開始位置  \n"+
            "*@param* `end` - 検索終了位置  \n"+
            "*@return* - キャラの登録番号\n\n"+
            "") },
    },
    {
        label: "FINDLASTCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) FINDLASTCHARA {int | str} charaVariable, {int | str} value, int start = 0, int end = *** | (Function) int FINDLASTCHARA({int | str} charaVariable, {int | str} value, int start = 0, int end = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "キャラクタ変数とその値を指定し、変数がその値である最後のキャラクタの登録番号を返します。見つからなかった場合は-1を返します。start以上end未満の登録番号のキャラを検索範囲とします。ただし、検索範囲がキャラクタ数の範囲を超える場合はエラーとなります。 \n\n"+
            "*@param* {キャラクタ変数} `charaVariable` - キーとするキャラクタ変数  \n"+
            "*@param* `value` - 検索する値  \n"+
            "*@param* `start` - 検索開始位置  \n"+
            "*@param* `end` - 検索終了位置  \n"+
            "*@return* - キャラの登録番号\n\n"+
            "") },
    },
    {
        label: "COPYCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) COPYCHARA int from, int to" },
        nlsDocumentation: { "ja": new MarkdownString(
            "第一引数で指定された登録番号のキャラの全てのデータを第二引数で指定された登録番号のキャラにコピーします。\n\n"+
            "*@param* `from` - 元になるキャラの登録番号  \n"+
            "*@param* `to` - 上書きされるキャラの登録番号  \n"+
            "") },
    },
    {
        label: "ADDCOPYCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) ADDCOPYCHARA int id" },
        nlsDocumentation: { "ja": new MarkdownString(
            "引数で指定された登録番号のキャラと同じデータであるキャラを新たに追加します。\n\n"+
            "*@param* `id` - 複製するキャラの登録番号  \n"+
            "") },
    },
    {
        label: "VARSIZE",
        kind: Command,
        nlsDetail: { "ja": "(Command) VARSIZE str variableName | (Function) int VARSIZE(str variableName, int dimension = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Command)指定した変数の配列のサイズを取得します。多次元配列変数の場合、一番左の要素から順にRESULT:0, RESULT:1, RESULT:2と代入されます。\n\n"+
            "*@param* `variableName` - 変数名  \n"+
            "*@return* - 変数の各要素サイズの配列\n\n"+
            "(Function)指定した変数の配列のサイズを取得します。多次元配列変数の場合、指定された要素のサイズを取得します。\n\n"+
            "*@param* {文字列式} `variableName` - 変数名  \n"+
            "*@param* `dimension` - 要素位置  \n"+
            "*@return* - 変数の要素のサイズ  \n"+
            "") },
    },
    {
        label: "RESETDATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) RESETDATA" },
        nlsDocumentation: { "ja": new MarkdownString(
            "GLOBALとGLOBALSを除く全ての変数を初期化します。具体的には全てのキャラを削除し、全てのローカル変数および全ての通常の変数に0又は空文字列を代入します。また、PALAMLVやSTRなど初期値が設定されている変数については初期値を代入します。\n\n"+
            "") },
    },
    {
        label: "RESETGLOBAL",
        kind: Command,
        nlsDetail: { "ja": "(Command) RESETGLOBAL" },
        nlsDocumentation: { "ja": new MarkdownString(
            "グローバル変数を初期化します。具体的にはGLOBALに0を代入し、GLOBALSに空文字列を代入します。\n\n"+
            "") },
    },
    {
        label: "RESET_STAIN",
        kind: Command,
        nlsDetail: { "ja": "(Command) RESET_STAIN int id" },
        nlsDocumentation: { "ja": new MarkdownString(
            "第1引数で指定したキャラクタのSTAINを初期化する命令です。 初期値はBEGIN TRAINのときに代入される値と同様で、_replace.csvの「汚れの初期値」で指定できます。\n\n"+
            "*@param* `id` - キャラの登録番号  \n"+
            "") },
    },
    {
        label: "SWAP",
        kind: Command,
        nlsDetail: { "ja": "(Command) SWAP {int | str} variable1, {int | str} variable2" },
        nlsDocumentation: { "ja": new MarkdownString(
            "変数1と変数2の中身を入れ替えます。交換する2つの変数は同じ型（整数型と整数型、文字列型と文字列型）である必要があります。\n\n"+
            "*@param* {変数} `variable1` - 変数  \n"+
            "*@param* {変数} `variable2` - 変数  \n"+
            "") },
    },
    {
        label: "CSVNAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVNAME int CSVNo | (Function) str CSVNAME(int CSVNo)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された名前を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@returns* - CSVで定義されている名前  \n"+
            "") },
            // 第二引数を渡すとSPキャラを参照できる隠された仕様があるみたいだけど非推奨っぽいから省略していいよね……
    },
    {
        label: "CSVCALLNAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVCALLNAME int CSVNo | (Function) str CSVCALLNAME(int CSVNo)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された呼び名を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@returns* - CSVで定義されている呼び名  \n"+
            "") },
    },
    {
        label: "CSVNICKNAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVNICKNAME int CSVNo | (Function) str CSVNICKNAME(int CSVNo)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義されたあだ名を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@returns* - CSVで定義されているあだ名  \n"+
            "") },
    },
    {
        label: "CSVMASTERNAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVMASTERNAME int CSVNo | (Function) str CSVMASTERNAME(int CSVNo)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された主人の呼び方を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@returns* - CSVで定義されている主人の呼び方  \n"+
            "") },
    },
    {
        label: "CSVBASE",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVBASE int CSVNo, int index | (Function) int CSVBASE(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された基礎の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている基礎の値  \n"+
            "") },
            // 第三引数を渡すとSPキャラを参照できる隠された仕様があるみたいだけど非推奨っぽいから省略していいよね……
        },
    {
        label: "CSVCSTR",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVCSTR int CSVNo, int index | (Function) str CSVCSTR(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義されたCSTRの値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@returns* - CSVで定義されているCSTRの値  \n"+
            "") },
    },
    {
        label: "CSVABL",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVABL int CSVNo, int index | (Function) int CSVABL(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された能力の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている能力の値  \n"+
            "") },
    },
    {
        label: "CSVTALENT",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVTALENT int CSVNo, int index | (Function) int CSVTALENT(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された素質の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている素質の値  \n"+
            "") },
    },
    {
        label: "CSVMARK",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVMARK int CSVNo, int index | (Function) int CSVMARK(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された刻印の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている刻印の値  \n"+
            "") },
    },
    {
        label: "CSVEXP",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVEXP int CSVNo, int index | (Function) int CSVEXP(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された経験の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている経験の値  \n"+
            "") },
    },
    {
        label: "CSVRELATION",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVRELATION int CSVNo, int index | (Function) int CSVRELATION(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された相性の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている相性の値  \n"+
            "") },
    },
    {
        label: "CSVJUEL",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVJUEL int CSVNo, int index | (Function) int CSVJUEL(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された珠の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている珠の値  \n"+
            "") },
    },
    {
        label: "CSVEQUIP",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVEQUIP int CSVNo, int index | (Function) int CSVEQUIP(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義された装着物の値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されている装着物の値  \n"+
            "") },
    },
    {
        label: "CSVCFLAG",
        kind: Command,
        nlsDetail: { "ja": "(Command) CSVCFLAG int CSVNo, int index | (Function) int CSVCFLAG(int CSVNo, int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "CSVで定義されたフラグの値を直接取得します。\n\n"+
            "*@param* `CSVNo` - CSVで指定されているキャラ番号  \n"+
            "*@param* `index` - 変数のインデックス  \n"+
            "*@return* - CSVで定義されているフラグの値  \n"+
            "") },
    },
    {
        label: "GETNUM",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETNUM str variableName, str key | (Function) int GETNUM(str variableName, str key)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "各csvで定義されている名称からその数値を取得します。定義されていない場合は-1になります。\n\n"+
            "*@param* `variableName` - 変数名  \n"+
            "*@param* {文字列式} `key` - 定義済みの名称  \n"+
            "*@return* - CSVで定義されている値  \n"+
            "*@example* - \n\n"+
            "```\n"+
            ";ABL.csv\n"+
            "2, 技巧\n"+
            "\n"+
            ";ERB\n"+
            "GETNUM(ABL, \"技巧\")\n"+
            ";2\n"+
            "```\n"+
            "") },
    },
    {
        label: "GETPALAMLV",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETPALAMLV int value, int maxLV | (Function) int GETPALAMLV(int value, int maxLV)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "与えられた値の内容とPALAMLVを比較し、その引数がPALAMLVでどこまで以上かを取得します。\n\n"+
            "*@param* `value` - PALAMの値  \n"+
            "*@param* `maxLV` - 調査する最大のLV  \n"+
            "*@return* - PALAMLV  \n"+
            "") },
    },
    {
        label: "GETEXPLV",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETEXPLV int value, int maxLV | (Function) int GETEXPLV(int value, int maxLV)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "与えられた値の内容とEXPLVを比較し、その引数がEXPLVでどこまで以上かを取得します。\n\n"+
            "*@param* `value` - EXPの値  \n"+
            "*@param* `maxLV` - 調査する最大のLV  \n"+
            "*@return* - EXPLV  \n"+
            "") },
    },
    {
        label: "FINDELEMENT",
        kind: Command,
        nlsDetail: { "ja": "(Command) FINDELEMENT {int[] | str[]} array, {int | str} value, int start = 0, int end = ***, int exact = 0 | (Function) int FINDELEMENT({int | str} array, {int | str} value, int start = 0, int end = ***, int exact = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列中の特定範囲から、指定した内容と最初に一致する要素の位置を取得します。CFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ数え上げます。\n\n"+
            "*@param* {一次元配列変数} `array` - EXPの値  \n"+
            "*@param* `value` - 検索対象、文字列の場合は正規表現を使用できます。  \n"+
            "*@param* `start` - 検索開始位置  \n"+
            "*@param* `end` - 検索終了位置  \n"+
            "*@param* `exact` - 文字列型でのみ有効\n\n"+
            "- 0:部分一致\n"+
            "- 1:完全一致\n\n"+
            "*@return* - 一致した要素の位置  \n"+
            "") },
    },
    {
        label: "FINDLASTELEMENT",
        kind: Command,
        nlsDetail: { "ja": "(Command) FINDELEMENT {int[] | str[]} array, {int | str} value, int start = 0, int end = ***, int exact = 0 | (Function) int FINDELEMENT({int | str} array, {int | str} value, int start = 0, int end = ***, int exact = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列中の特定範囲から、指定した内容と最後に一致する要素の位置を取得します。CFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ数え上げます。\n\n"+
            "*@param* {一次元配列変数} `array` - 検索対象の配列変数  \n"+
            "*@param* `value` - 検索する値、文字列の場合は正規表現を使用できます。  \n"+
            "*@param* `start` - 検索開始位置  \n"+
            "*@param* `end` - 検索終了位置  \n"+
            "*@param* `exact` - 文字列型でのみ有効\n\n"+
            "- 0:部分一致\n"+
            "- 1:完全一致\n\n"+
            "*@return* - 一致した要素の位置  \n"+
            "") },
    },
    {
        label: "VARSET",
        kind: Command,
        nlsDetail: { "ja": "(Command) VARSET {int[] | str[]} array, {int | str} value = 0 | \"\", int start = 0, int end = ***" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した変数の配列の指定範囲に第二引数の値を代入します。\n\n"+
            "*@param* {一次元配列変数} `array` - 配列変数  \n"+
            "*@param* `value` - 代入する値  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `end` - 終了位置  \n"+
            "*@example* - \n\n"+
            "```\n"+
            "VARSET FLAG, 0\n"+
            "VARSET STR, \"あああ\", 0, 10\n"+
            "VARSET TA:0:0:0,5678\n"+
            "```\n"+
            "この例ではFLAGの要素全てが0になります。\n"+
            "STR:0からSTR:9には\"あああ\"が代入され、TAについても三次元配列の全ての要素に5678が代入されます。\n"+
            "同じことはERB上でFOR-NEXTループなどを使って行うこともできますが、ループ回数が数十万回程度になると実行時間が無視できなくなります。\n"+
            "VARSET命令はERB上での代入よりはるかに早く処理を終わらせることができます。\n"+
            "キャラクタ変数をVARSET命令の対象にした場合、指定したキャラの要素のみに代入されます。\n"+
            "\n"+
            "```\n"+
            "VARSET CFLAG:MASTER:0, 0\n"+
            "VARSET CSTR, \"\"\n"+
            "```\n"+
            "この例ではMASTERのCFLAG:0～999（変更していなければ）が0になりますが、他のキャラのCFLAGは影響を受けません。\n"+
            "また、対象を省略した場合は通常通りTARGETとみなされるのでTARGETのCSTRが全て\"\"になります。他のキャラのCSTRは影響を受けません。\n\n"+
            "") },
    },
    {
        label: "CVARSET",
        kind: Command,
        nlsDetail: { "ja": "(Command) CVARSET {int[] | str[]} array, int index = 0, {int | str} value = 0 | \"\", int start = 0, int end = ***" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した登録キャラクタについてキャラクタ変数の特定要素へ代入する命令です。\n\n"+
            "*@param* {キャラクタ変数} `array` - 配列変数  \n"+
            "*@param* `index` - 代入する要素のインデックス  \n"+
            "*@param* `value` - 代入する値  \n"+
            "*@param* `start` - キャラクタ範囲開始位置  \n"+
            "*@param* `end` - キャラクタ範囲終了位置  \n"+
            "") },
    },
    {
        label: "ARRAYSHIFT",
        kind: Command,
        nlsDetail: { "ja": "(Command) ARRAYSHIFT {int[] | str[]} array, int shiftLength, {int | str} defaultValue = 0 | \"\", int start = 0, int length = ***" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列変数を指定した数だけずらす命令です。配列の範囲からはみでた値は掃き捨てとなり、ずらして出来た空白領域は第2引数で指定した値で満たします。1次元配列および配列型キャラクタ変数のみに対応しています。DITEMTYPEやTA等に使用することはできません。\n\n"+
            "*@param* {配列変数} `array` - 対象変数  \n"+
            "*@param* `shiftLength` - ずらす数。正の値で添え字の大きい方へ、負の値で小さい方にずらします。  \n"+
            "*@param* `defaultValue` - 空白となった領域に代入する値  \n"+
            "*@param* `start` - 範囲開始位置  \n"+
            "*@param* `length` - ずらす要素の範囲の長さ  \n"+
            "") },
    },
    {
        label: "ARRAYREMOVE",
        kind: Command,
        nlsDetail: { "ja": "(Command) ARRAYREMOVE {int[] | str[]} array, int start, int length" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列変数を指定した初期値から要素数分だけ削除し、後ろの値を前へ詰めます。1次元配列および配列型キャラクタ変数のみに対応しています。DITEMTYPEやTA等に使用することはできません。\n\n"+
            "*@param* {配列変数} `array` - 対象変数  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `length` - 対象範囲の長さ。0以下にすると初期値から後ろ全て消去になります。  \n"+
            "") },
    },
    {
        label: "ARRAYSORT",
        kind: Command,
        nlsDetail: { "ja": "(Command) ARRAYSORT {int[] | str[]} array, str order, int start, int length" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列変数の指定した位置から対象要素数個の配列データをソートします。\n\n"+
            "*@param* {配列変数} `array` - 対象変数  \n"+
            "*@param* {FORWARD | BACK} `order` - ソート方向  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `length` - 対象範囲の長さ  \n"+
            "") },
    },
    {
        label: "ARRAYCOPY",
        kind: Command,
        nlsDetail: { "ja": "(Command) ARRAYCOPY str from, str to" },
        nlsDocumentation: { "ja": new MarkdownString(
            "コピー元変数の値をコピー先変数へコピーします。要素数が異なる場合はコピーできる分だけコピーします。キャラクター変数には非対応です。\n\n"+
            "*@param* {文字列式} `from` - コピー元変数名  \n"+
            "*@param* {文字列式} `to` - コピー先変数名  \n"+
            "") },
    },
    {
        label: "CUPCHECK",
        kind: Command,
        nlsDetail: { "ja": "(Command) CUPCHECK int id" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`CUP`, `CDOWN`を参照し、指定したキャラに対し`UPCHECK`に相当する処理を実行します。CUPCHECKによる結果は表示されません。\n\n"+
            "*@param* `id` - キャラ登録番号  \n"+
            "") },
    },
    {
        label: "SAVEDATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) SAVEDATA int index, str comment" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した番号のファイルに現在の状態をセーブします。\n\n"+
            "*@param* `index` - セーブファイル番号  \n"+
            "*@param* {文字列式} `comment` - コメント  \n"+
            "") },
    },
    {
        label: "LOADDATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) LOADDATA int index" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した番号のファイルのデータをロードします。ロードに失敗した場合、エラー終了します。必ずCHKDATA命令でロード可能かどうかを調べてから実行してください。\n\n"+
            "*@param* `index` - セーブファイル番号  \n"+
            "") },
    },
    {
        label: "DELDATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) DELDATA int index" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した番号のファイルのデータを削除します。\n\n"+
            "*@param* `index` - セーブファイル番号  \n"+
            "") },
    },
    {
        label: "CHKDATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) CHKDATA int index || (Function) int CHKDATA(int index)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Command)指定した番号のファイルのデータを取得します。\n\n"+
            "*@param* `index` - セーブファイル番号  \n"+
            "*@return* RESULT:0 - ロード可能か\n\n"+
            "- 0:このファイルはロード可能です。\n"+
            "- 1:指定されたファイルは存在しません。\n"+
            "- 2:ゲームのコードが違います。(gamebase.csvの\"コード\"の値が違うデータ)\n"+
            "- 3:バージョンが違います。(gamebase.csvの\"バージョン\"の値が異なり、許容されるバージョンでもないデータ)\n"+
            "- 4:上記以外の問題があるファイルです。\n\n"+
            "*@returns* RESULTS:0 - セーブデータのコメント。ロード不可能な場合\"セーブデータのバーションが異なります\"などのエラーメッセージが代入されます。\n\n"+
            "(Function)指定した番号のファイルのデータを取得します。\n\n"+
            "*@param* `index` - セーブファイル番号  \n"+
            "*@return* - ロード可能か。値はCommand版と同様。  \n"+
            "*@return* RESULT:0 - セーブデータのタイムスタンプ。2009年3月28日13時5分23秒678ミリ秒であれば、`RESULT = 20090328130523678`  \n"+
            "*@returns* RESULTS:0 - セーブデータのコメント。ロード不可能な場合\"セーブデータのバーションが異なります\"などのエラーメッセージが代入されます。\n\n"+
            "") },
    },
    {
        label: "SAVENOS",
        kind: Command,
        nlsDetail: { "ja": "(Command) SAVENOS int variable || (Function) int SAVENOS()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Command)コンフィグ\"表示するセーブデータ数\"で指定された数を取得します。結果は指定された数値変数に代入します。\n\n"+
            "*@param* `variable` - 格納先変数  \n"+
            "(Function)コンフィグ\"表示するセーブデータ数\"で指定された数を取得します。\n\n"+
            "*@return* - 表示するセーブデータ数  \n"+
            "") },
    },
    {
        label: "SAVEGLOBAL",
        kind: Command,
        nlsDetail: { "ja": "(Command) SAVEGLOBAL" },
        nlsDocumentation: { "ja": new MarkdownString(
            "変数`GLOBAL`と`GLOBALS`をセーブします。保存先は\"global.sav\"です。ERHファイル内で`GLOBAL`及び`SAVEDATA`フラグを持つ変数が定義されていればそれもセーブします。\n\n"+
            "") },
    },
    {
        label: "LOADGLOBAL",
        kind: Command,
        nlsDetail: { "ja": "(Command) LOADGLOBAL" },
        nlsDocumentation: { "ja": new MarkdownString(
            "GLOBALとGLOBALSをロードします。読み込みに失敗してもエラーにはなりません。通常のセーブデータと同様に、gamebase.csvで設定されたコード、バージョンが適切でないファイルはロードできません。\n\n"+
            "*@return* - 読み込みに成功すると1、失敗すると0。  \n"+
            "*@see* - `GLOBAL`  \n"+
            "") },
    },
    {
        label: "OUTPUTLOG",
        kind: Command,
        nlsDetail: { "ja": "(Command) OUTPUTLOG" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ファイルにログを出力します。ログの文字コードはUnicodeです。\n\n"+
            "") },
    },
    {
        label: "SAVECHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) SAVECHARA str filename, str memo, int charaNo1, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したキャラクタのデータをファイルに保存する命令です。datフォルダーが存在しない場合、フォルダの作成を試みます。作成に失敗した場合エラーになります。\n\n"+
            "*@param* `filename` - データをセーブするファイル名(の一部)を指定します。実際のファイル名は\"chara_*.dat\"になります。空文字列である、またはファイル名に使えない文字が含まれるなどの場合エラーになります。  \n"+
            "*@param* `memo` - セーブデータのメモとなる文字列を保存します。後にCHKCHARADATA関数により読むことができます。  \n"+
            "*@param* `charaNo1` - セーブしたいキャラの登録番号を指定します。いくつでも可能ですが同一の登録番号を複数回指定することはできません。  \n"+
            "") },
    },
    {
        label: "LOADCHARA",
        kind: Command,
        nlsDetail: { "ja": "(Command) LOADCHARA str filename" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したファイルからキャラクタを読み込む命令です。SAVEされているキャラの数だけ新しいキャラを登録します。何名のキャラが追加されたかを知るにはロード前後でのCHARANUMを比較してください。\n\n"+
            "*@param* `filename` - データをセーブするファイル名(の一部)を指定します。実際のファイル名は\"chara_*.dat\"になります。  \n"+
            "*@return* - 読み込みに成功すると1、失敗すると0。  \n"+
            "") },
    },
    {
        label: "CHKCHARADATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) CHKCHARADATA str filename || (Function) int CHKCHARADATA(str filename)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したファイルからキャラクタの情報を取得する命令です。\n\n"+
            "*@param* `filename` - データをセーブするファイル名(の一部)を指定します。実際のファイル名は\"chara_*.dat\"になります。  \n"+
            "*@return* - ロード可能な場合は0。何らかの理由により不可能な場合は非0。  \n"+
            "*@returns* RESULTS:0 - セーブデータのメモ。またはエラーメッセージ。  \n"+
            "") },
    },
    {
        label: "FIND_CHARADATA",
        kind: Command,
        nlsDetail: { "ja": "(Command) FIND_CHARADATA str filename = \"*\" || (Function) int FIND_CHARADATA(str filename = \"*\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "LOADCHARAの対象となり得るファイルをdatフォルダの中から探索しファイル名(chara_*.datの*の部分)を`RESULTS`に代入します。\n\n"+
            "*@param* `filename` - 検索するファイル名。`FIND_CHARADATA(\"*あなた*\")`であれば、chara_*あなた*.datを探し、chara_001あなた.datやchara_あなたABC.datがヒットします。  \n"+
            "*@return* - 一致したファイル数  \n"+
            "*@returns* RESULTS - 条件に一致したファイル名  \n"+
            "") },
    },
    {
        label: "GETTIME",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETTIME || (Function) int GETTIME()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Command)パソコンの現在日時・時刻に関する情報を取得します。精度は実行する環境にもよりますが、十数～数十ミリ秒程度です。\n\n"+
            "*@return* RESULT:0 - 現在日時の数値表記。2009年3月28日13時5分23秒678ミリ秒であれば、`RESULT:0 == 20090328130523678`  \n"+
            "*@returns* RESULTS:0 - 現在日時の文字列表記。上記例では`RESULTS:0 == \"2009年03月28日 13:05:23\"`\n\n"+
            "(Function)パソコンの現在日時・時刻に関する情報を取得します。精度は実行する環境にもよりますが、十数～数十ミリ秒程度です。\n\n"+
            "*@return* - 現在日時の数値表記。  \n"+
            "") },
    },
    {
        label: "GETMILLISECOND",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETMILLISECOND || (Function) int GETMILLISECOND()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "西暦0001年1月1日からの経過時間をミリ秒単位で取得します。精度は実行する環境にもよりますが、十数～数十ミリ秒程度です。\n\n"+
            "*@return* - 経過時間  \n"+
            "") },
    },
    {
        label: "GETSECOND",
        kind: Command,
        nlsDetail: { "ja": "(Command) GETSECOND || (Function) int GETSECOND()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "西暦0001年1月1日からの経過時間を秒単位で取得します。精度は実行する環境にもよりますが、十数～数十ミリ秒程度です。\n\n"+
            "*@return* - 経過時間  \n"+
            "") },
    },
    {
        label: "FORCEWAIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) FORCEWAIT" },
        nlsDocumentation: { "ja": new MarkdownString(
            "右クリック、マクロのスキップでスキップできないWAIT命令です。この命令に達した時点でこれらのスキップ状態は解除されます。\n\n"+
            "") },
    },
    {
        label: "INPUT",
        kind: Command,
        nlsDetail: { "ja": "(Command) INPUT int default = null" },
        nlsDocumentation: { "ja": new MarkdownString(
            "整数の入力待ちを行う命令です。\n\n"+
            "*@param* `default` - デフォルトの入力値です。この引数およびプレイヤーからの入力も省略された場合、再度`INPUT`による入力待ちとなります。  \n"+
            "*@return* - 入力された整数  \n"+
            "") },
    },
    {
        label: "INPUTS",
        kind: Command,
        nlsDetail: { "ja": "(Command) INPUTS str default = \"\"" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列の入力待ちを行う命令です。\n\n"+
            "*@param* `default` - デフォルトの入力値です。この引数およびプレイヤーからの入力も省略された場合、入力結果は空文字となります。  \n"+
            "*@returns* - 入力された文字列  \n"+
            "") },
    },
    {
        label: "TINPUT",
        kind: Command,
        nlsDetail: { "ja": "(Command) TINPUT int ms, int default, int showRemainingTime = 1, str message = GETCONFIGS(\"時間切れ表示\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "制限時間のある入力受付命令です。\n\n"+
            "*@param* `ms` - 制限時間(ms)。100msより細かい値を設定しても正確な動作はできません。  \n"+
            "*@param* `default` - 時間切れ時のデフォルトのリターン値  \n"+
            "*@param* `showRemainingTime` - 残り時間を表示するかで0なら非表示、他は表示。  \n"+
            "*@param* `message` - 時間切れ時に表示される文字列。空文字列の場合はタイマー表示を消去して次の処理へ移ります。  \n"+
            "*@return* - 入力された整数  \n"+
            "") },
    },
    {
        label: "TINPUTS",
        kind: Command,
        nlsDetail: { "ja": "(Command) TINPUTS int ms, str default, int showRemainingTime = 1, str message = GETCONFIGS(\"時間切れ表示\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "制限時間のある入力受付命令です。\n\n"+
            "*@param* `ms` - 制限時間(ms)。100msより細かい値を設定しても正確な動作はできません。  \n"+
            "*@param* `default` - 時間切れ時のデフォルトのリターン値  \n"+
            "*@param* `showRemainingTime` - 残り時間を表示するかで0なら非表示、他は表示。  \n"+
            "*@param* `message` - 時間切れ時に表示される文字列。空文字列の場合はタイマー表示を消去して次の処理へ移ります。  \n"+
            "*@returns* - 入力された文字列  \n"+
            "") },
    },
    {
        label: "TWAIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) TWAIT int ms, int acceptInput" },
        nlsDocumentation: { "ja": new MarkdownString(
            "制限時間経過するまで動作を停止する命令です。\n\n"+
            "*@param* `ms` - 制限時間(ms)  \n"+
            "*@param* {0 | 1} `acceptInput` - \n\n"+
            "- 0:入力を受け付けません（制限時間まで強制的に待たせることができます）\n"+
            "- 1:入力を受け付け、入力がなされると制限時間前でも次に進みます。\n"+
            "") },
    },
    {
        label: "ONEINPUT",
        kind: Command,
        nlsDetail: { "ja": "(Command) ONEINPUT int default = null" },
        nlsDocumentation: { "ja": new MarkdownString(
            "1桁のみの整数の入力待ちを行う命令です。入力すると自動的に次の処理に移ります。\n\n"+
            "*@param* `default` - デフォルトの入力値です。この引数およびプレイヤーからの入力も省略された場合、再度`INPUT`による入力待ちとなります。  \n"+
            "*@return* - 入力された整数  \n"+
            "") },
    },
    {
        label: "ONEINPUTS",
        kind: Command,
        nlsDetail: { "ja": "(Command) ONEINPUTS str default = \"\"" },
        nlsDocumentation: { "ja": new MarkdownString(
            "1文字のみの文字列の入力待ちを行う命令です。入力すると自動的に次の処理に移ります。\n\n"+
            "*@param* `default` - デフォルトの入力値です。この引数およびプレイヤーからの入力も省略された場合、入力結果は空文字となります。  \n"+
            "*@returns* - 入力された文字列  \n"+
            "") },
    },
    {
        label: "TONEINPUT",
        kind: Command,
        nlsDetail: { "ja": "(Command) TONEINPUT int ms, int default, int showRemainingTime = 1, str message = GETCONFIGS(\"時間切れ表示\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "制限時間のある1桁のみの入力受付命令です。\n\n"+
            "*@param* `ms` - 制限時間(ms)。100msより細かい値を設定しても正確な動作はできません。  \n"+
            "*@param* `default` - 時間切れ時のデフォルトのリターン値  \n"+
            "*@param* `showRemainingTime` - 残り時間を表示するかで0なら非表示、他は表示。  \n"+
            "*@param* `message` - 時間切れ時に表示される文字列。空文字列の場合はタイマー表示を消去して次の処理へ移ります。  \n"+
            "*@return* - 入力された整数  \n"+
            "") },
    },
    {
        label: "TONEINPUTS",
        kind: Command,
        nlsDetail: { "ja": "(Command) TONEINPUTS int ms, str default, int showRemainingTime = 1, str message = GETCONFIGS(\"時間切れ表示\")" },
        nlsDocumentation: { "ja": new MarkdownString(
            "制限時間のある1文字のみの入力受付命令です。\n\n"+
            "*@param* `ms` - 制限時間(ms)。100msより細かい値を設定しても正確な動作はできません。  \n"+
            "*@param* `default` - 時間切れ時のデフォルトのリターン値  \n"+
            "*@param* `showRemainingTime` - 残り時間を表示するかで0なら非表示、他は表示。  \n"+
            "*@param* `message` - 時間切れ時に表示される文字列。空文字列の場合はタイマー表示を消去して次の処理へ移ります。  \n"+
            "*@returns* - 入力された文字列  \n"+
            "") },
    },
    {
        label: "WAITANYKEY",
        kind: Command,
        nlsDetail: { "ja": "(Command) WAITANYKEY" },
        nlsDocumentation: { "ja": new MarkdownString(
            "いずれかのキー入力、またはマウスのクリックを待つWAIT命令です。\n\n"+
            "") },
    },
    {
        label: "BREAK",
        kind: Command,
    },
    {
        label: "CONTINUE",
        kind: Command,
    },
    {
        label: "RANDOMIZE",
        kind: Command,
        nlsDetail: { "ja": "(Command) RANDOMIZE int seed" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した値で乱数を初期化します。\n\n"+
            "*@param* `seed` - 初期化する乱数シード  \n"+
            "") },
    },
    {
        label: "DUMPRAND",
        kind: Command,
        nlsDetail: { "ja": "(Command) DUMPRAND" },
        nlsDocumentation: { "ja": new MarkdownString(
            "現在の乱数の状態をRANDDATA変数に保存します。\n\n"+
            "") },
    },
    {
        label: "INITRAND",
        kind: Command,
        nlsDetail: { "ja": "(Command) INITRAND" },
        nlsDocumentation: { "ja": new MarkdownString(
            "RANDDATA変数に保存したデータを読み出します。DUMPRANDを行う前にINITRANDを行ってしまわないように注意してください。RANDDATA変数の中身が不適当な場合、RANDが正常に動作しなくなります。\n\n"+
            "") },
    },
    {
        label: "BEGIN",
        kind: Command,
        nlsDetail: { "ja": "(Command) BEGIN str keyword" },
        nlsDocumentation: { "ja": new MarkdownString(
            "*@param* {TITLE | FIRST | TRAIN | AFTERTRAIN | ABLUP | TURNEND | SHOP}`keyword` - キーワード  \n"+
            "") },
    },
    {
        label: "CALLTRAIN",
        kind: Command,
        nlsDetail: { "ja": "(Command) CALLTRAIN int n" },
        nlsDocumentation: { "ja": new MarkdownString(
            "連続してコマンドを実行する命令です。あらかじめSELECTCOM:(1～)にコマンド番号を代入しておき、実行するコマンドの数を引数にして実行します。\n\n"+
            "*@param* `num` - 実行するコマンドの数  \n"+
            "*@example* - \n\n"+
            "```\n"+
            "SELECTCOM:1 = XXX\n"+
            "SELECTCOM:2 = YYY\n"+
            "...\n"+
            "SELECTCOM:n = ZZZ\n"+
            "\n"+
            "CALLTRAIN n\n"+
            "```\n"+
            "") },
    },
    {
        label: "DOTRAIN",
        kind: Command,
        nlsDetail: { "ja": "(Command) DOTRAIN int comNo" },
        nlsDocumentation: { "ja": new MarkdownString(
            "強制的にTRAINを行う命令です。`@EVENTTRAIN`、`@SHOW_STATUS`、`@SHOW_USERCOM`、`@USERCOM`、`@EVENTCOMEND`及びそこから呼び出された関数の中でのみ使用可能です。`@COM_ABLE`を呼び出さず、強制的に実行されます。\n\n"+
            "*@param* `comNo` - 実行するコマンド番号  \n"+
            "") },
    },
    {
        label: "THROW",
        kind: Command,
        nlsDetail: { "ja": "(Command) THROW str message" },
        nlsDocumentation: { "ja": new MarkdownString(
            "強制的にエラーとし、エラー表示を行う命令です。\n\n"+
            "*@param* {書式付き文字列} `message` - エラーメッセージ  \n"+
            "") },
    },
    {
        label: "CALL",
        kind: Command,
        nlsDetail: { "ja": "(Command) CALL str commandName, var args, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "他の関数を実行する命令です。呼び出した関数が終了した後、元の関数の`CALL`を実行した位置から処理を続行します。\n\n"+
            "*@param* `commandName` - 実行する関数名  \n"+
            "*@param* `args` - 実行する関数に渡す引数  \n"+
            "") },
    },
    {
        label: "JUMP",
        kind: Command,
        nlsDetail: { "ja": "(Command) JUMP str commandName, var args, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "他の関数を実行する命令です。呼び出した関数が終了した後、元の関数には復帰しません。\n\n"+
            "*@param* `commandName` - 実行する関数名  \n"+
            "*@param* `args` - 実行する関数に渡す引数  \n"+
            "") },
    },
    {
        label: "GOTO",
        kind: Command,
        nlsDetail: { "ja": "(Command) GOTO" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`$***`で定義されたラベルに移動する関数です。\n\n"+
            "*@example* - \n\n"+
            "```\n"+
            "$INPUT_LOOP\n"+
            "PRINTL ０から９までの数字を入力してください。\n"+
            "INPUT\n"+
            "SIF RESULT < 0 || RESULT > 9\n"+
            "   GOTO INPUT_LOOP\n"+
            "PRINTFORML {RESULT}が入力されました。\n"+
            "```\n"+
            "") },
    },
    {
        label: "CALLFORM",
        kind: Command,
    },
    {
        label: "JUMPFORM",
        kind: Command,
    },
    {
        label: "GOTOFORM",
        kind: Command,
    },
    {
        label: "TRYCALL",
        kind: Command,
    },
    {
        label: "TRYJUMP",
        kind: Command,
    },
    {
        label: "TRYGOTO",
        kind: Command,
    },
    {
        label: "TRYCALLFORM",
        kind: Command,
    },
    {
        label: "TRYJUMPFORM",
        kind: Command,
    },
    {
        label: "TRYGOTOFORM",
        kind: Command,
    },
    {
        label: "CALLF",
        kind: Command,
        nlsDetail: { "ja": "(Command) CALLF str commandName, var args, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "式中関数を返り値無視で呼び出す命令です。呼び出した関数が終了した後、元の関数の`CALLF`を実行した位置から処理を続行します。\n\n"+
            "*@param* `commandName` - 実行する関数名  \n"+
            "*@param* `args` - 実行する関数に渡す引数  \n"+
            "") },
    },
    {
        label: "CALLFORMF",
        kind: Command,
    },
    {
        label: "CALLEVENT",
        kind: Command,
        nlsDetail: { "ja": "(Command) CALLF str commandName" },
        nlsDocumentation: { "ja": new MarkdownString(
            "イベント関数をイベント関数として呼び出します。イベント関数中やイベント関数から呼び出された関数中で使用することもできません。\n\n"+
            "*@param* `commandName` - 実行する関数名  \n"+
            "") },
    },
    {
        label: "FUNC",
        kind: Command,
    },
    {
        label: "RETURN",
        kind: Command,
    },
    {
        label: "RETURNFORM",
        kind: Command,
    },
    {
        label: "RETURNF",
        kind: Command,
    },
    {
        label: "DEBUGPRINT",
        kind: Command,
        nlsDetail: { "ja": "(Command) DEBUGPRINT str value" },
        nlsDocumentation: { 
            "ja": new MarkdownString(
                "デバッグコンソールに文字列を表示する命令です。\n\n"+
                "*@param* `value` - 表示する文字列。\n\n"
            ),
    },
    {
        label: "DEBUGPRINTL",
        kind: Command,
    },
    {
        label: "DEBUGPRINTFORM",
        kind: Command,
    },
    {
        label: "DEBUGPRINTFORML",
        kind: Command,
    },
    {
        label: "DEBUGCLEAR",
        kind: Command,
        nlsDetail: { "ja": "(Command) DEBUGCLEAR" },
        nlsDocumentation: { "ja": new MarkdownString(
            "デバッグコンソールのPRINT内容を全て削除します。\n\n"+
            "") },
    },
    {
        label: "ASSERT",
        kind: Command,
        nlsDetail: { "ja": "(Command) ASSERT int object" },
        nlsDocumentation: { "ja": new MarkdownString(
            "引数が真(非0)のとき、何もしません。引数が偽(0)の時、エラーを出力してスクリプトの実行を停止します。\n\n"+
            "*@param* `object` - 検査対象  \n"+
            "") },
    },
    {
        label: "TOOLTIP_SETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOOLTIP_SETCOLOR int color, int backgroundColor" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ツールチップの前景色及び背景色を0xRRGGBB形式の数値で設定します。\n\n"+
            "*@param* `color` - フォントの色  \n"+
            "*@param* `backgroundColor` - 背景色  \n"+
            "") },
    },
    {
        label: "TOOLTIP_SETDELAY",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOOLTIP_SETDELAY int ms" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ツールチップが表示されるまでの時間をミリ秒単位で設定します。デフォルトは500(ミリ秒)、最大値は32767です。\n\n"+
            "*@param* `ms` - ツールチップが表示されるまでの時間(ms)  \n"+
            "") },
    },
    {
        label: "HTML_PRINT",
        kind: Command,
        nlsDetail: { "ja": "(Command) HTML_PRINT str value" },
        nlsDocumentation: { "ja": new MarkdownString(
            "htmlっぽいタグを利用してPRINTする命令です。引数がPRINTのような文字列ではなくPRINTSと同じ文字列式でり、自動的に改行するので実際はPRINTSLの動作に近いです。HTML_PRINTによる描画はALIGNMENT、SETFONT、COLOR、FONTSTYLE命令とその類似命令の影響を受けません。これらの効果を得るには全てタグで指定する必要があります。\n\n"+
            "*@param* {文字列式} `value` - 表示する文字列  \n"+
            "*@see* - 詳細は[Emuera Wiki](https://ja.osdn.net/projects/emuera/wiki/exhtml)を参照  \n"+
            "") },
    },
    {
        label: "HTML_TAGSPLIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) HTML_TAGSPLIT str value, int intVariable = RESULT, str[] strVariable = RESULTS" },
        nlsDocumentation: { "ja": new MarkdownString(
            "対象文字列をHTML文字列と解釈し、タグと平文に分割します。\n\n"+
            "*@param* {文字列式} `value` - 分割対象の文字列  \n"+
            "*@param* {数値型変数} `intVariable` - 分割数を格納します。分割処理中にエラーが生じた場合、-1が代入されます。  \n"+
            "*@param* {文字列型配列変数} `strVariable` - 分割後文字列を格納します。分割数が配列サイズを超えた場合、超えた分は代入されません。  \n"+
            "") },
    },
    {
        label: "CLEARTEXTBOX",
        kind: Command,
        nlsDetail: { "ja": "(Command) CLEARTEXTBOX" },
        nlsDocumentation: { "ja": new MarkdownString(
            "最下部の入力欄のテキストを全て消去します。\n\n"+
            "") },
    },
    {
        label: "STOPCALLTRAIN",
        kind: Command,
        nlsDetail: { "ja": "(Command) STOPCALLTRAIN" },
        nlsDocumentation: { "ja": new MarkdownString(
            "実行中の`CALLTRAIN`の処理を終了します。\n\n"+
            "") },
    },
    {
        label: "TIMES",
        kind: Command,
        nlsDetail: { "ja": "(Command) TIMES int variable, number multiplier" },
        nlsDocumentation: { "ja": new MarkdownString(
            "小数を含む掛け算を行い、結果を変数に代入します。計算結果の小数は切り捨てられます。\n\n"+
            "*@param* {数値型変数} `variable` - 被乗数。元の値は計算結果で上書きされる。  \n"+
            "*@param* {小数を含む数値} `multiplier` - 乗数  \n"+
            "") },
    },
    {
        label: "BAR",
        kind: Command,
        nlsDetail: { "ja": "(Command) BAR int value, int max, int length" },
        nlsDocumentation: { "ja": new MarkdownString(
            "グラフを文字列で表示します。\n\n"+
            "*@param* `value` - 値  \n"+
            "*@param* `max` - 最大値  \n"+
            "*@param* `length` - グラフの長さ  \n"+
            "*@see* - `BARSTR`  \n"+
            "") },
    },
    {
        label: "BARL",
        kind: Command,
        nlsDetail: { "ja": "(Command) BARL int value, int max, int length" },
        nlsDocumentation: { "ja": new MarkdownString(
            "グラフを文字列で表示し、改行します。\n\n"+
            "*@param* `value` - 値  \n"+
            "*@param* `max` - 最大値  \n"+
            "*@param* `length` - グラフの長さ  \n"+
            "*@see* - `BARSTR`  \n"+
            "") },
    },
    {
        label: "PUTFORM",
        kind: Command,
        nlsDetail: { "ja": "(Command) PUTFORM str info" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`@SAVEINFO`でのみ使えます。セーブデータに概要をつけることができます。\n\n"+
            "*@param* {書式付き文字列} `info` - 概要  \n"+
            "*@see* - `SAVEDATA`  \n"+
            "") },
    },
    {
        label: "SAVEGAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) SAVEGAME" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`@SHOP`でのみ使えます。セーブ画面を呼び出します。\n\n"+
            "*@see* - `SAVEDATA`  \n"+
            "") },
    },
    {
        label: "LOADGAME",
        kind: Command,
        nlsDetail: { "ja": "(Command) LOADGAME" },
        nlsDocumentation: { "ja": new MarkdownString(
            "`@SHOP`でのみ使えます。ロード画面を呼び出します。\n\n"+
            "*@see* - `LOADDATA`  \n"+
            "") },
    },
    {
        label: "WAIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) WAIT" },
        nlsDocumentation: { "ja": new MarkdownString(
            "処理の実行を停止し、プレイヤーの入力を待機します。\n\n"+
            "") },
    },
    {
        label: "RESTART",
        kind: Command,
        nlsDetail: { "ja": "(Command) RESTART" },
        nlsDocumentation: { "ja": new MarkdownString(
            "関数の最初から処理をやり直します。\n\n"+
            "") },
    },
    {
        label: "QUIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) QUIT" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ゲームを終了します。\n\n"+
            "") },
    },
    {
        label: "TOOLTIP_SETDURATION",
        kind: Command,
        nlsDetail: { "ja": "(Command) TOOLTIP_SETDURATION int ms" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ツールチップの表示時間を設定します。\n\n"+
            "*@param* `ms` - ツールチップの最大表示時間(ms) 0の場合デフォルトの挙動になります。 \n"+
            "") },
    },
    {
        label: "AWAIT",
        kind: Command,
        nlsDetail: { "ja": "(Command) AWAIT int ms = ?" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ERBの実行を一時停止し、Windowsの処理を行います。AWAIT命令はEmueraの無限ループ警告を中断し、Emueraのプロセスが「応答なし」になることを防ぎます。時間がかかる処理を行うときに使用して下さい。\n\n"+
            "*@param* `ms` - 待機時間(ms) \n"+
            "") },
    },
    {
        label: "STRJOIN",
        kind: Function,
        nlsDetail: { "ja": "(Command) STRJOIN str[] array, str separator = \",\", int start = 0, int length = *** || (Function) str STRJOIN(str[] array, str separator = \",\", int start = 0, int length = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "文字列配列を結合した結果を取得します。\n\n"+
            "*@param* {配列変数} `array` - 対象変数  \n"+
            "*@param* `separator` - 区切り文字  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `length` - 範囲の長さ  \n"+
            "*@returns*  - 結合した文字列  \n"+
            "") },
    },
    {
        label: "GETKEY",
        kind: Function,
        nlsDetail: { "ja": "(Command) GETKEY int vkey || (Function) GETKEY(int vkey)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "キーボード及びマウスボタンの状態を返します。この関数はEmueraのウインドウがアクティブのときのみ1を返し、アクティブ状態でなければキー状態にかかわらず0を返します。\n\n"+
            "*@param* `vkey` - 対象のキーコード \n"+
            "*@return* - キーが押されていれば1、押されていなければ0を返します。 \n"+
            "*@see* - キーコードの詳細は[microsoft](https://learn.microsoft.com/ja-jp/windows/win32/inputdev/virtual-key-codes)を参照 \n"+
            "") },
    },
    {
        label: "GETKEYTRIGGERED",
        kind: Function,
        nlsDetail: { "ja": "(Command) GETKEYTRIGGERED int vkey || (Function) int GETKEYTRIGGERED(int vkey)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "キーボード及びマウスボタンの状態を返します。この関数はEmueraのウインドウがアクティブのときのみ1を返し、アクティブ状態でなければキー状態にかかわらず0を返します。\n\n"+
            "*@param* `vkey` - 対象のキーコード \n"+
            "*@return* - キーが押された直後のみ1を返します。それ以外は0を返します。 \n"+
            "*@see* - キーコードの詳細は[microsoft](https://learn.microsoft.com/ja-jp/windows/win32/inputdev/virtual-key-codes)を参照 \n"+
            "") },
    },
    {
        label: "MOUSEX",
        kind: Function,
        nlsDetail: { "ja": "(Command) MOUSEX || (Function) int MOUSEX()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "マウスカーソルの現在のX座標を取得します。座標はクライアント領域の左下位置を(0,0)とする相対位置であり、右方向がx軸の正です。クライアント領域の広さは`CLIENTWIDTH`関数によって取得できます。この関数はEmueraのウインドウがアクティブでなくても、また、マウスカーソルがウインドウ外であっても正常に動作します。\n\n"+
            "*@return* - マウスカーソルの現在のX座標  \n"+
            "*@see* - `CLIENTWIDTH`  \n"+
            "") },
    },
    {
        label: "MOUSEY",
        kind: Function,
        nlsDetail: { "ja": "(Command) MOUSEY || (Function) int MOUSEY()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "マウスカーソルの現在のY座標を取得します。座標はクライアント領域の左下位置を(0,0)とする相対位置であり、下方向がy軸の正です。カーソルがクライアント領域内にある場合MOUSEYは負の値を返すことに注意してください。クライアント領域の広さは`CLIENTHEIGHT`関数によって取得できます。（クライアント領域左上を基準とするY座標が必要なら、MOUSEY()+CLIENTHEIGHT()によって取得できます）この関数はEmueraのウインドウがアクティブでなくても、また、マウスカーソルがウインドウ外であっても正常に動作します。\n\n"+
            "*@return* - マウスカーソルの現在のY座標  \n"+
            "*@see* - `CLIENTHEIGHT`  \n"+
            "") },
    },
    {
        label: "ISACTIVE",
        kind: Function,
        nlsDetail: { "ja": "(Command) ISACTIVE || (Function) int ISACTIVE()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "Emueraのウインドウの状態を返します。\n\n"+
            "*@return* - アクティブであれば1、アクティブでなければ0を返します。  \n"+
            "") },
        },
    {
        label: "SAVETEXT",
        kind: Function,
        nlsDetail: { "ja": "(Command) SAVETEXT str text, int fileNo, int force_savDir = 0, int force_UTF8 = 0 || (Function) int SAVETEXT(str text, int fileNo, int force_savDir = 0, int force_UTF8 = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "テキストをファイルに保存します。この命令はテキストにヘッダーなどを付け加えたり変更したりすることなく文字列そのままを保存します。この命令は通常はオプション設定の影響を受け、savフォルダ内に作成されたり、UTF-8で保存されます。短い時間中に同一ファイルに書き込むことを繰り返した場合、ウイルス対策ソフト等の影響で書き込みに失敗する可能性があります。\n\n"+
            "*@param* `text` - 保存するテキスト内容  \n"+
            "*@param* `fileNo` - ファイル番号。2なら保存先ファイルは\"text02.txt\"  \n"+
            "*@param* `force_savDir` - savフォルダの作成を強制するか。非0を指定した場合、オプションを無視して強制的にsavフォルダ内に保存します。savフォルダは必要に応じて作成されます。  \n"+
            "*@param* `force_UTF8` - UTF-8での保存を強制するか。非0を指定した場合、オプションを無視して強制的にUTF-8エンコードで保存します。  \n"+
            "*@return* - 成功した場合に非0が、失敗した場合0が返ります。  \n"+
            "") },
    },
    {
        label: "LOADTEXT",
        kind: Function,
        nlsDetail: { "ja": "(Command) LOADTEXT int fileNo, int force_savDir = 0, int force_UTF8 = 0 || (Function) str LOADTEXT(int fileNo, int force_savDir = 0, int force_UTF8 = 0)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "ファイルからテキストを読み込みます。\n\n"+
            "*@param* `fileNo` - ファイル番号。2なら読み込み先ファイルは\"text02.txt\"  \n"+
            "*@param* `force_savDir` - savフォルダの探索を強制するか。非0を指定した場合、オプションによらずsavフォルダ内のファイルを探します。  \n"+
            "*@param* `force_UTF8` - UTF-8での読み込みを強制するか。非0を指定した場合、UTF-8エンコードで保存されているものとして読み取ります。  \n"+
            "*@returns* - 読み込んだテキスト。失敗した場合、空文字列を返します。  \n"+
            "") },
    },
    {
        label: "SPRITECREATED",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITECREATED str spriteName || (Function) int SPRITECREATED(str spriteName)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトが作成済みかを調べます。\n\n"+
            "*@param* `spriteName` - 調べるスプライトの名称  \n"+
            "*@return* - 作成済みであるなら1を、未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "SPRITEWIDTH",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITEWIDTH str spriteName || (Function) int SPRITEWIDTH(str spriteName)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトの幅を取得します。\n\n"+
            "*@param* `spriteName` - 調べるスプライトの名称  \n"+
            "*@return* - スプライトの幅。未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "SPRITEHEIGHT",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITEHEIGHT str spriteName || (Function) int SPRITEHEIGHT(str spriteName)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトの高さを取得します。\n\n"+
            "*@param* `spriteName` - 調べるスプライトの名称  \n"+
            "*@return* - スプライトの高さ。未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "SPRITEPOSX",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITEPOSX str spriteName || (Function) int SPRITEPOSX(str spriteName)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトの相対位置のXを取得します。\n\n"+
            "*@param* `spriteName` - 調べるスプライトの名称  \n"+
            "*@return* - スプライトの位置。未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "SPRITEPOSY",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITEPOSY str spriteName || (Function) int SPRITEPOSY(str spriteName)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトの相対位置のYを取得します。\n\n"+
            "*@param* `spriteName` - 調べるスプライトの名称  \n"+
            "*@return* - スプライトの位置。未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "SPRITESETPOS",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITESETPOS str spriteName, int posX, int posY || (Function) int SPRITESETPOS(str spriteName, int posX, int posY)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトの相対位置を設定します。\n\n"+
            "*@param* `spriteName` - スプライトの名称  \n"+
            "*@param* `posX` - 相対位置X  \n"+
            "*@param* `posY` - 相対位置Y  \n"+
            "*@return* - 成功した場合は非0を、指定したスプライトが未作成又は廃棄済み等の理由で失敗した場合には0を返します。  \n"+
            "") },
    },
    {
        label: "SPRITEMOVE",
        kind: Function,
        nlsDetail: { "ja": "(Command) SPRITEMOVE str spriteName, int posX, int posY || (Function) int SPRITEMOVE(str spriteName, int posX, int posY)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "スプライトの相対位置に指定した値を加算します。\n\n"+
            "*@param* `spriteName` - スプライトの名称  \n"+
            "*@param* `posX` - 相対位置X  \n"+
            "*@param* `posY` - 相対位置Y  \n"+
            "*@return* - 成功した場合は非0を、指定したスプライトが未作成又は廃棄済み等の理由で失敗した場合には0を返します。  \n"+
            "") },
    },
    {
        label: "ARRAYMSORT",
        kind: Function,
        nlsDetail: { "ja": "(Command) STRJOIN var[] array1, var[] array2, ..." },
        nlsDocumentation: { "ja": new MarkdownString(
            "array1を昇順でソートし、それと同じ順序でarray2以降の配列を並び替えます。array1に0または空文字列の要素があるとき、それを配列の終端とみなし以降の要素はソートしません。array2以降の配列の要素数がarray1のソートされた要素数よりも少ない場合場合、命令を中断しRESULT:0に0を代入して終了します。全ての配列のソートに成功した場合、この命令はRESULT:0に非0を代入して終了します。\n\n"+
            "*@param* {配列変数} `array1` - 対象配列変数。一次元配列である必要があります。  \n"+
            "*@param* {配列変数} `array2` - 対象配列変数。array2以降は多次元配列も受け付けます。  \n"+
            "*@returns* - 成功したか。 0:失敗, 0以外:成功  \n"+
            "") },
    },
    {
        label: "GCREATED",
        kind: Function,
        nlsDetail: { "ja": "(Command) GCREATED int gId || (Function) int GCREATED(int gId)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "Graphicsが作成済みかを調べます。\n\n"+
            "*@param* `gId` - 調べるGraphicsのId  \n"+
            "*@return* - 作成済みであるなら1を、未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "GWIDTH",
        kind: Function,
        nlsDetail: { "ja": "(Command) GWIDTH int gId || (Function) int GWIDTH(int gId)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "Graphicsの幅を調べます。\n\n"+
            "*@param* `gId` - 調べるGraphicsのId  \n"+
            "*@return* - Graphicsの幅。未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "GHEIGHT",
        kind: Function,
        nlsDetail: { "ja": "(Command) GHEIGHT int gId || (Function) int GHEIGHT(int gId)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "Graphicsの高さを調べます。\n\n"+
            "*@param* `gId` - 調べるGraphicsのId  \n"+
            "*@return* - Graphicsの高さ。未作成又は廃棄済みであるなら0を返します。  \n"+
            "") },
    },
    {
        label: "GGETCOLOR",
        kind: Function,
        nlsDetail: { "ja": "(Command) GGETCOLOR int gId, int posX, int posY || (Function) int GGETCOLOR(int gId, int posX, int posY)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "Graphicsの指定位置の色を取得します。この命令のみ、失敗した場合に0ではなく**-1**を返すことに注意してください。黒色かつ完全透明の位置の色を取得した場合に、この命令は0を返します。\n\n"+
            "*@param* `gId` - GraphicsのId  \n"+
            "*@param* `posX` - 相対位置X  \n"+
            "*@param* `posY` - 相対位置Y  \n"+
            "*@return* - 0xAARRGGBB形式の整数値。未作成又は廃棄済み等の理由で失敗した場合には**-1**を返します。  \n"+
            "") },
    },
    {
        label: "GCREATE",
        kind: Function,
        nlsDetail: { "ja": "(Command) GCREATE int gId, int width, int height || (Function) int GCREATE(int gId, int width, int height)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したサイズで指定したIDのGraphicsを作成します。\n\n"+
            "*@param* `gId` - GraphicsのId。0以上の整数。  \n"+
            "*@param* `width` - 相対位置X。1以上8192以下の間の整数値でなければなりません。  \n"+
            "*@param* `height` - 相対位置Y。1以上8192以下の間の整数値でなければなりません。  \n"+
            "*@return* - 作成に成功した場合、非0を返します。指定したIDのGraphicsが既に作成されている場合、0を返します。  \n"+
            "") },
    },
    {
        label: "GCREATEFROMFILE",
        kind: Function,
        nlsDetail: { "ja": "(Command) GCREATEFROMFILE int gId, str filePath || (Function) int GCREATEFROMFILE(int gId, str filePath)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "resourcesフォルダ内の画像ファイルを相対パスで指定し、その画像を開いてGraphicsを作成します。resourcesフォルダ内のcsvファイルでリソースを宣言した場合と異なり、画像ファイルはロックされません。\n\n"+
            "*@param* `gId` - GraphicsのId。0以上の整数。  \n"+
            "*@param* `filePath` - resourcesフォルダ内の画像ファイル。相対パス  \n"+
            "*@return* - 作成に成功した場合、非0を返します。指定したIDのGraphicsが既に作成されている場合、0を返します。ファイルが存在しない、画像として認識できない、ファイルのサイズが大きすぎる、などで失敗した場合も0を返します。  \n"+
            "") },
    },
    {
        label: "GDISPOSE",
        kind: Function,
        nlsDetail: { "ja": "(Command) GDISPOSE int gId || (Function) int GDISPOSE(int gId)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したIDのGraphicsを廃棄します。\n\n"+
            "*@param* `gId` - GraphicsのId  \n"+
            "*@return* - 廃棄に成功した場合、非0を返します。指定したIDのGraphicsが未作成（廃棄済の場合を含む）の場合、0を返します。  \n"+
            "") },
    },
    {
        label: "GCLEAR",
        kind: Function,
        nlsDetail: { "ja": "(Command) GCLEAR int gId, int cARGB || (Function) int GCLEAR(int gId, int cARGB)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定したIDのGraphicsの全域を指定した色で置き換えます。\n\n"+
            "*@param* `gId` - GraphicsのId  \n"+
            "*@param* `cARGB` - 0xAARRGGBB形式の整数値  \n"+
            "*@return* - 処理に成功した場合、非0を返します。指定したIDのGraphicsが未作成（廃棄済の場合を含む）の場合、0を返します。  \n"+
            "") },
    },
    {
        label: "GFILLRECTANGLE",
        kind: Function,
    },
    {
        label: "GDRAWSPRITE",
        kind: Function,
    },
    {
        label: "GSETCOLOR",
        kind: Function,
    },
    {
        label: "GDRAWG",
        kind: Function,
    },
    {
        label: "GDRAWGWITHMASK",
        kind: Function,
    },
    {
        label: "GSETBRUSH",
        kind: Function,
    },
    {
        label: "GSETFONT",
        kind: Function,
    },
    {
        label: "GSETPEN",
        kind: Function,
    },
    {
        label: "GSAVE",
        kind: Function,
    },
    {
        label: "GLOAD",
        kind: Function,
    },
    {
        label: "SPRITECREATE",
        kind: Function,
    },
    {
        label: "SPRITEANIMECREATE",
        kind: Function,
    },
    {
        label: "SPRITEANIMEADDFRAME",
        kind: Function,
    },
    {
        label: "SPRITEDISPOSE",
        kind: Function,
    },
    {
        label: "SPRITEGETCOLOR",
        kind: Function,
    },
    {
        label: "CBGSETG",
        kind: Function,
    },
    {
        label: "CBGSETSPRITE",
        kind: Function,
    },
    {
        label: "CBGCLEAR",
        kind: Function,
    },
    {
        label: "CBGREMOVERANGE",
        kind: Function,
    },
    {
        label: "CBGSETBUTTONSPRITE",
        kind: Function,
    },
    {
        label: "CBGCLEARBUTTON",
        kind: Function,
    },
    {
        label: "CBGSETBMAPG",
        kind: Function,
    },
    {
        label: "CBGREMOVEBMAP",
        kind: Function,
    },
    {
        label: "INPUTMOUSEKEY",
        kind: Command,
    },
    {
        label: "SETANIMETIMER",
        kind: Command,
    },
    {
        label: "GETTIMES",
        kind: Function,
        nlsDetail: { "ja": "(Command) GETTIMES || (Function) int GETTIMES()" },
        nlsDocumentation: { "ja": new MarkdownString(
            "パソコンの現在日時・時刻に関する情報を取得します。精度は実行する環境にもよりますが、十数～数十ミリ秒程度です。\n\n"+
            "*@returns* - 現在日時の文字列表記。  \n"+
            "") },
    },
    {
        label: "RAND",
        kind: Function,
        nlsDetail: { "ja": "(Variable) RAND || (Function) int RAND(int min = 0, int max)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "(Function)乱数を生成します。RAND(X)はRAND:Xと全く同じ動作をします。RAND関数では2つの引数を指定することができ、2つ指定された場合は1つ目の引数が乱数の最小値として使われます。\n\n"+
            "*@param* `min` - 生成される数値の最小値。  \n"+
            "*@param* `max` - 生成される数値の最大値。  \n"+
            "*@returns* - 現在日時の文字列表記。  \n"+
            "") },
    },
    {
        label: "CBRT",
        kind: Function,
        nlsDetail: { "ja": "(Command) CBRT int value || (Function) int CBRT(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値の三重根を返します。端数は切り捨てます。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 三重根\n\n"+
            "") },
    },
    {
        label: "LOG",
        kind: Function,
        nlsDetail: { "ja": "(Command) LOG int value || (Function) int LOG(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値の自然対数を返します。端数は切り捨てます。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 自然対数\n\n"+
            "") },
    },
    {
        label: "LOG10",
        kind: Function,
        nlsDetail: { "ja": "(Command) LOG10 int value || (Function) int LOG10(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値の常用対数を返します。端数は切り捨てます。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 常用対数\n\n"+
            "") },
    },
    {
        label: "EXPONENT",
        kind: Function,
        nlsDetail: { "ja": "(Command) EXPONENT int value || (Function) int EXPONENT(int value)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "数値のネイピア数を底とする指数関数を返します。端数は切り捨てます。\n\n"+
            "*@param* `value` - 数値  \n"+
            "*@return* - 指数関数\n\n"+
            "") },
    },
    {
        label: "SUMARRAY",
        kind: Function,
        nlsDetail: { "ja": "(Command) SUMARRAY int[] array, int start = 0, int end = *** || (Function) int SUMARRAY(int[] array, int start = 0, int end = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列の値の総和を返します。\n\n"+
            "*@param* {1次元数値型配列} `array` - 配列変数。指定できるものは数値型1次元配列変数のみで文字列変数や多次元配列は指定できません。CFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ合計します。  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `end` - 終了位置  \n"+
            "*@return* - 総和\n\n"+
            "") },
    },
    {
        label: "MATCH",
        kind: Function,
        nlsDetail: { "ja": "(Command) SUMARRAY var[] array, var value, int start = 0, int end = *** || (Function) int SUMARRAY(var[] array, var value, int start = 0, int end = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した配列変数の中に`value`と一致する要素がいくつあるかを返します。\n\n"+
            "*@param* {1次元配列} `array` - 配列変数。指定できるものは1次元配列変数のみで文字列変数や多次元配列は指定できません。CFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ数え上げます。  \n"+
            "*@param* `value` - 検索内容  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `end` - 終了位置  \n"+
            "*@return* - 一致した数\n\n"+
            "") },
    },
    {
        label: "MAXARRAY",
        kind: Function,
        nlsDetail: { "ja": "(Command) MAXARRAY int[] array, int start = 0, int end = *** || (Function) int MAXARRAY(int[] array, int start = 0, int end = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列の値の最大値を返します。\n\n"+
            "*@param* {1次元数値型配列} `array` - 配列変数。指定できるものは数値型1次元配列変数のみで文字列変数や多次元配列は指定できません。CFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ検索します。  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `end` - 終了位置  \n"+
            "*@return* - 最大値\n\n"+
            "") },
    },
    {
        label: "MINARRAY",
        kind: Function,
        nlsDetail: { "ja": "(Command) MINARRAY int[] array, int start = 0, int end = *** || (Function) int MINARRAY(int[] array, int start = 0, int end = ***)" },
        nlsDocumentation: { "ja": new MarkdownString(
            "配列の値の最小値を返します。\n\n"+
            "*@param* {1次元数値型配列} `array` - 配列変数。指定できるものは数値型1次元配列変数のみで文字列変数や多次元配列は指定できません。CFLAGなどのキャラクタ配列を指定した場合、指定されたキャラについてのみ検索します。  \n"+
            "*@param* `start` - 開始位置  \n"+
            "*@param* `end` - 終了位置  \n"+
            "*@return* - 最小値\n\n"+
            "") },
    },
    {
        label: "SUMCARRAY",
        kind: Function,
    },
    {
        label: "CMATCH",
        kind: Function,
    },
    {
        label: "MAXCARRAY",
        kind: Function,
    },
    {
        label: "MINCARRAY",
        kind: Function,
    },
    {
        label: "GROUPMATCH",
        kind: Function,
    },
    {
        label: "NOSAMES",
        kind: Function,
    },
    {
        label: "ALLSAMES",
        kind: Function,
    },
    {
        label: "MESSKIP",
        kind: Function,
    },
    {
        label: "CONVERT",
        kind: Function,
    },
    {
        label: "COLOR_FROMNAME",
        kind: Function,
    },
    {
        label: "COLOR_FROMRGB",
        kind: Function,
    },
    {
        label: "INRANGEARRAY",
        kind: Function,
    },
    {
        label: "INRANGECARRAY",
        kind: Function,
    },
    {
        label: "GETLINESTR",
        kind: Function,
    },
    {
        label: "PRINTCLENGTH",
        kind: Function,
    },
    {
        label: "STRFORM",
        kind: Function,
    },
    {
        label: "GETCONFIG",
        kind: Function,
    },
    {
        label: "GETCONFIGS",
        kind: Function,
    },
    {
        label: "HTML_POPPRINTINGSTR",
        kind: Function,
    },
    {
        label: "HTML_GETPRINTEDSTR",
        kind: Function,
    },
    {
        label: "HTML_ESCAPE",
        kind: Function,
    },
    {
        label: "HTML_TOPLAINTEXT",
        kind: Function,
    },
    {
        label: "CLIENTWIDTH",
        kind: Function,
    },
    {
        label: "CLIENTHEIGHT",
        kind: Function,
    },
    {
        label: "PRINTDATA",
        kind: Control,
        nlsDetail: { "ja": "(Command) PRINTDATA int x" },
        nlsDocumentation: { "ja": new MarkdownString(
            "指定した文字列を確率均一でランダムで表示する命令です。IFとRANDを使わずにランダム表示を実装可能です。引数に数値変数を指定した場合は表示された変数DATAの番号が入ります。表示された文字列によって後の処理を分岐したい場合に利用できます。DATALIST～ENDLIST内ではDATAorDATAFORM1個が1行に相当します\n\n"+
            "*@param* `x` - 表示された候補の番号が格納される。 \n"+
            "*@example*\n\n"+
            "```\n"+
            "PRINTDATA LOCAL\n"+
            "    DATA (文字)\n"+
            "    DATAFORM (FORM文字列)\n"+
            "    DATALIST\n"+
            "        (DATA or DATAFORMの羅列)\n"+
            "    ENDLIST\n"+
            "ENDDATA\n"+
            "```\n"+
            "") },
    },
    {
        label: "PRINTDATAL",
        kind: Control,
    },
    {
        label: "PRINTDATAW",
        kind: Control,
    },
    {
        label: "PRINTDATAK",
        kind: Control,
    },
    {
        label: "PRINTDATAKL",
        kind: Control,
    },
    {
        label: "PRINTDATAKW",
        kind: Control,
    },
    {
        label: "PRINTDATAD",
        kind: Control,
    },
    {
        label: "PRINTDATADL",
        kind: Control,
    },
    {
        label: "PRINTDATADW",
        kind: Control,
    },
    {
        label: "STRDATA",
        kind: Control,
    },
    {
        label: "ENDDATA",
        kind: Control,
    },
    {
        label: "DATALIST",
        kind: Control,
    },
    {
        label: "ENDLIST",
        kind: Control,
    },
    {
        label: "NOSKIP",
        kind: Control,
    },
    {
        label: "ENDNOSKIP",
        kind: Control,
    },
    {
        label: "SIF",
        kind: Control,
    },
    {
        label: "IF",
        kind: Control,
    },
    {
        label: "ELSEIF",
        kind: Control,
    },
    {
        label: "ELSE",
        kind: Control,
    },
    {
        label: "ENDIF",
        kind: Control,
    },
    {
        label: "REPEAT",
        kind: Control,
    },
    {
        label: "REND",
        kind: Control,
    },
    {
        label: "FOR",
        kind: Control,
    },
    {
        label: "NEXT",
        kind: Control,
    },
    {
        label: "WHILE",
        kind: Control,
    },
    {
        label: "WEND",
        kind: Control,
    },
    {
        label: "DO",
        kind: Control,
    },
    {
        label: "LOOP",
        kind: Control,
    },
    {
        label: "SELECTCASE",
        kind: Control,
    },
    {
        label: "CASE",
        kind: Control,
    },
    {
        label: "IS",
        kind: Control,
    },
    {
        label: "TO",
        kind: Control,
    },
    {
        label: "CASEELSE",
        kind: Control,
    },
    {
        label: "ENDSELECT",
        kind: Control,
    },
    {
        label: "TRYCJUMP",
        kind: Control,
    },
    {
        label: "TRYCCALL",
        kind: Control,
    },
    {
        label: "TRYCGOTO",
        kind: Control,
    },
    {
        label: "TRYCJUMPFORM",
        kind: Control,
    },
    {
        label: "TRYCCALLFORM",
        kind: Control,
    },
    {
        label: "TRYCGOTOFORM",
        kind: Control,
    },
    {
        label: "CATCH",
        kind: Control,
    },
    {
        label: "ENDCATCH",
        kind: Control,
    },
    {
        label: "TRYCALLLIST",
        kind: Control,
    },
    {
        label: "TRYJUMPLIST",
        kind: Control,
    },
    {
        label: "TRYGOTOLIST",
        kind: Control,
    },
    {
        label: "ENDFUNC",
        kind: Control,
    },
    {
        label: "#DIM",
        kind: Keyword,
    },
    {
        label: "#DIMS",
        kind: Keyword,
    },
    {
        label: "#SINGLE",
        kind: Keyword,
    },
    {
        label: "#PRI",
        kind: Keyword,
    },
    {
        label: "#LATER",
        kind: Keyword,
    },
    {
        label: "#ONLY",
        kind: Keyword,
    },
    {
        label: "#FUNCTION",
        kind: Keyword,
    },
    {
        label: "#FUNCTIONS",
        kind: Keyword,
    },
    {
        label: "#LOCALSIZE",
        kind: Keyword,
    },
    {
        label: "#LOCALSSIZE",
        kind: Keyword,
    },
    {
        label: "#DEFINE",
        kind: Keyword,
    },
    {
        label: "IF_DEBUG",
        kind: Keyword,
    },
    {
        label: "IF_NDEBUG",
        kind: Keyword,
    },
    {
        label: "SKIPSTART",
        kind: Keyword,
    },
    {
        label: "SKIPEND",
        kind: Keyword,
    },
    {
        label: "SAVEDATA",
        kind: Keyword,
    },
    {
        label: "CHARADATA",
        kind: Keyword,
    },
    {
        label: "GLOBAL",
        kind: Keyword,
    },
    {
        label: "DYNAMIC",
        kind: Keyword,
    },
    {
        label: "STATIC",
        kind: Keyword,
    },
    {
        label: "CONST",
        kind: Keyword,
    },
    {
        label: "REF",
        kind: Keyword,
    },
    {
        label: "SHOP",
        kind: Keyword,
    },
    {
        label: "TRAIN",
        kind: Keyword,
    },
    {
        label: "ABLUP",
        kind: Keyword,
    },
    {
        label: "AFTERTRAIN",
        kind: Keyword,
    },
    {
        label: "TURNEND",
        kind: Keyword,
    },
    {
        label: "FIRST",
        kind: Keyword,
    },
    {
        label: "TITLE",
        kind: Keyword,
    },
    {
        label: "LEFT",
        kind: Keyword,
    },
    {
        label: "CENTER",
        kind: Keyword,
    },
    {
        label: "RIGHT",
        kind: Keyword,
    },
    {
        label: "FORWARD",
        kind: Keyword,
    },
    {
        label: "BACK",
        kind: Keyword,
    },
    {
        label: "DAY",
        kind: Variable,
    },
    {
        label: "MONEY",
        kind: Variable,
    },
    {
        label: "ITEM",
        kind: Variable,
    },
    {
        label: "FLAG",
        kind: Variable,
    },
    {
        label: "TFLAG",
        kind: Variable,
    },
    {
        label: "UP",
        kind: Variable,
    },
    {
        label: "PALAMLV",
        kind: Variable,
    },
    {
        label: "EXPLV",
        kind: Variable,
    },
    {
        label: "EJAC",
        kind: Variable,
    },
    {
        label: "DOWN",
        kind: Variable,
    },
    {
        label: "RESULT",
        kind: Variable,
    },
    {
        label: "COUNT",
        kind: Variable,
    },
    {
        label: "TARGET",
        kind: Variable,
    },
    {
        label: "ASSI",
        kind: Variable,
    },
    {
        label: "MASTER",
        kind: Variable,
    },
    {
        label: "NOITEM",
        kind: Variable,
    },
    {
        label: "LOSEBASE",
        kind: Variable,
    },
    {
        label: "SELECTCOM",
        kind: Variable,
    },
    {
        label: "ASSIPLAY",
        kind: Variable,
    },
    {
        label: "PREVCOM",
        kind: Variable,
    },
    {
        label: "TIME",
        kind: Variable,
    },
    {
        label: "ITEMSALES",
        kind: Variable,
    },
    {
        label: "PLAYER",
        kind: Variable,
    },
    {
        label: "NEXTCOM",
        kind: Variable,
    },
    {
        label: "PBAND",
        kind: Variable,
    },
    {
        label: "BOUGHT",
        kind: Variable,
    },
    {
        label: "A",
        kind: Variable,
    },
    {
        label: "B",
        kind: Variable,
    },
    {
        label: "C",
        kind: Variable,
    },
    {
        label: "D",
        kind: Variable,
    },
    {
        label: "E",
        kind: Variable,
    },
    {
        label: "F",
        kind: Variable,
    },
    {
        label: "G",
        kind: Variable,
    },
    {
        label: "H",
        kind: Variable,
    },
    {
        label: "I",
        kind: Variable,
    },
    {
        label: "J",
        kind: Variable,
    },
    {
        label: "K",
        kind: Variable,
    },
    {
        label: "L",
        kind: Variable,
    },
    {
        label: "M",
        kind: Variable,
    },
    {
        label: "N",
        kind: Variable,
    },
    {
        label: "O",
        kind: Variable,
    },
    {
        label: "P",
        kind: Variable,
    },
    {
        label: "Q",
        kind: Variable,
    },
    {
        label: "R",
        kind: Variable,
    },
    {
        label: "S",
        kind: Variable,
    },
    {
        label: "T",
        kind: Variable,
    },
    {
        label: "U",
        kind: Variable,
    },
    {
        label: "V",
        kind: Variable,
    },
    {
        label: "W",
        kind: Variable,
    },
    {
        label: "X",
        kind: Variable,
    },
    {
        label: "Y",
        kind: Variable,
    },
    {
        label: "Z",
        kind: Variable,
    },
    {
        label: "GLOBAL",
        kind: Variable,
    },
    {
        label: "RANDDATA",
        kind: Variable,
    },
    {
        label: "SAVESTR",
        kind: Variable,
    },
    {
        label: "TSTR",
        kind: Variable,
    },
    {
        label: "STR",
        kind: Variable,
    },
    {
        label: "RESULTS",
        kind: Variable,
    },
    {
        label: "GLOBALS",
        kind: Variable,
    },
    {
        label: "SAVEDATA_TEXT",
        kind: Variable,
    },
    {
        label: "ISASSI",
        kind: Variable,
    },
    {
        label: "NO",
        kind: Variable,
    },
    {
        label: "BASE",
        kind: Variable,
    },
    {
        label: "MAXBASE",
        kind: Variable,
    },
    {
        label: "ABL",
        kind: Variable,
    },
    {
        label: "TALENT",
        kind: Variable,
    },
    {
        label: "EXP",
        kind: Variable,
    },
    {
        label: "MARK",
        kind: Variable,
    },
    {
        label: "PALAM",
        kind: Variable,
    },
    {
        label: "SOURCE",
        kind: Variable,
    },
    {
        label: "EX",
        kind: Variable,
    },
    {
        label: "CFLAG",
        kind: Variable,
    },
    {
        label: "JUEL",
        kind: Variable,
    },
    {
        label: "RELATION",
        kind: Variable,
    },
    {
        label: "EQUIP",
        kind: Variable,
    },
    {
        label: "TEQUIP",
        kind: Variable,
    },
    {
        label: "STAIN",
        kind: Variable,
    },
    {
        label: "GOTJUEL",
        kind: Variable,
    },
    {
        label: "NOWEX",
        kind: Variable,
    },
    {
        label: "DOWNBASE",
        kind: Variable,
    },
    {
        label: "CUP",
        kind: Variable,
    },
    {
        label: "CDOWN",
        kind: Variable,
    },
    {
        label: "TCVAR",
        kind: Variable,
    },
    {
        label: "NAME",
        kind: Variable,
    },
    {
        label: "CALLNAME",
        kind: Variable,
    },
    {
        label: "NICKNAME",
        kind: Variable,
    },
    {
        label: "MASTERNAME",
        kind: Variable,
    },
    {
        label: "CSTR",
        kind: Variable,
    },
    {
        label: "CDFLAG",
        kind: Variable,
    },
    {
        label: "DITEMTYPE",
        kind: Variable,
    },
    {
        label: "DA",
        kind: Variable,
    },
    {
        label: "DB",
        kind: Variable,
    },
    {
        label: "DC",
        kind: Variable,
    },
    {
        label: "DD",
        kind: Variable,
    },
    {
        label: "DE",
        kind: Variable,
    },
    {
        label: "TA",
        kind: Variable,
    },
    {
        label: "TB",
        kind: Variable,
    },
    {
        label: "ITEMPRICE",
        kind: Variable,
    },
    {
        label: "ABLNAME",
        kind: Variable,
    },
    {
        label: "TALENTNAME",
        kind: Variable,
    },
    {
        label: "EXPNAME",
        kind: Variable,
    },
    {
        label: "MARKNAME",
        kind: Variable,
    },
    {
        label: "PALAMNAME",
        kind: Variable,
    },
    {
        label: "ITEMNAME",
        kind: Variable,
    },
    {
        label: "TRAINNAME",
        kind: Variable,
    },
    {
        label: "BASENAME",
        kind: Variable,
    },
    {
        label: "SOURCENAME",
        kind: Variable,
    },
    {
        label: "EXNAME",
        kind: Variable,
    },
    {
        label: "EQUIPNAME",
        kind: Variable,
    },
    {
        label: "TEQUIPNAME",
        kind: Variable,
    },
    {
        label: "FLAGNAME",
        kind: Variable,
    },
    {
        label: "TFLAGNAME",
        kind: Variable,
    },
    {
        label: "CFLAGNAME",
        kind: Variable,
    },
    {
        label: "TCVARNAME",
        kind: Variable,
    },
    {
        label: "CSTRNAME",
        kind: Variable,
    },
    {
        label: "STAINNAME",
        kind: Variable,
    },
    {
        label: "CDFLAGNAME1",
        kind: Variable,
    },
    {
        label: "CDFLAGNAME2",
        kind: Variable,
    },
    {
        label: "STRNAME",
        kind: Variable,
    },
    {
        label: "TSTRNAME",
        kind: Variable,
    },
    {
        label: "SAVESTRNAME",
        kind: Variable,
    },
    {
        label: "GLOBALNAME",
        kind: Variable,
    },
    {
        label: "GLOBALSNAME",
        kind: Variable,
    },
    {
        label: "GAMEBASE_AUTHER",
        kind: Variable,
    },
    {
        label: "GAMEBASE_AUTHOR",
        kind: Variable,
    },
    {
        label: "GAMEBASE_INFO",
        kind: Variable,
    },
    {
        label: "GAMEBASE_YEAR",
        kind: Variable,
    },
    {
        label: "GAMEBASE_TITLE",
        kind: Variable,
    },
    {
        label: "GAMEBASE_GAMECODE",
        kind: Variable,
    },
    {
        label: "GAMEBASE_VERSION",
        kind: Variable,
    },
    {
        label: "GAMEBASE_ALLOWVERSION",
        kind: Variable,
    },
    {
        label: "GAMEBASE_DEFAULTCHARA",
        kind: Variable,
    },
    {
        label: "GAMEBASE_NOITEM",
        kind: Variable,
    },
    {
        label: "RAND",
        kind: Variable,
    },
    {
        label: "CHARANUM",
        kind: Variable,
    },
    {
        label: "LASTLOAD_TEXT",
        kind: Variable,
    },
    {
        label: "LASTLOAD_VERSION",
        kind: Variable,
    },
    {
        label: "LASTLOAD_NO",
        kind: Variable,
    },
    {
        label: "LINECOUNT",
        kind: Variable,
    },
    {
        label: "ISTIMEOUT",
        kind: Variable,
    },
    {
        label: "__INT_MAX__",
        kind: Variable,
    },
    {
        label: "__INT_MIN__",
        kind: Variable,
    },
    {
        label: "EMUERA_VERSION",
        kind: Variable,
    },
    {
        label: "WINDOW_TITLE",
        kind: Variable,
    },
    {
        label: "MONEYLABEL",
        kind: Variable,
    },
    {
        label: "DRAWLINESTR",
        kind: Variable,
    },
    {
        label: "__FILE__",
        kind: Variable,
    },
    {
        label: "__FUNCTION__",
        kind: Variable,
    },
    {
        label: "__LINE__",
        kind: Variable,
    },
    {
        label: "LOCAL",
        kind: Variable,
    },
    {
        label: "ARG",
        kind: Variable,
    },
    {
        label: "LOCALS",
        kind: Variable,
    },
    {
        label: "ARGS",
        kind: Variable,
    },
]);
