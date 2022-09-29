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
            "*@see* - 注意点、詳細は[emuera wiki](https://ja.osdn.net/projects/emuera/wiki/excom#h5-SKIPDISP.20.3C.E6.95.B0.E5.80.A4.3E)を参照"+
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
    },
    {
        label: "ABS",
        kind: Command,
    },
    {
        label: "SIGN",
        kind: Command,
    },
    {
        label: "SQRT",
        kind: Command,
    },
    {
        label: "GETBIT",
        kind: Command,
    },
    {
        label: "MAX",
        kind: Command,
    },
    {
        label: "MIN",
        kind: Command,
    },
    {
        label: "LIMIT",
        kind: Command,
    },
    {
        label: "INRANGE",
        kind: Command,
    },
    {
        label: "SETBIT",
        kind: Command,
    },
    {
        label: "CLEARBIT",
        kind: Command,
    },
    {
        label: "INVERTBIT",
        kind: Command,
    },
    {
        label: "ADDCHARA",
        kind: Command,
    },
    {
        label: "DELCHARA",
        kind: Command,
    },
    {
        label: "SWAPCHARA",
        kind: Command,
    },
    {
        label: "SORTCHARA",
        kind: Command,
    },
    {
        label: "GETCHARA",
        kind: Command,
    },
    {
        label: "ADDDEFCHARA",
        kind: Command,
    },
    {
        label: "ADDVOIDCHARA",
        kind: Command,
    },
    {
        label: "DELALLCHARA",
        kind: Command,
    },
    {
        label: "PICKUPCHARA",
        kind: Command,
    },
    {
        label: "EXISTCSV",
        kind: Command,
    },
    {
        label: "FINDCHARA",
        kind: Command,
    },
    {
        label: "FINDLASTCHARA",
        kind: Command,
    },
    {
        label: "COPYCHARA",
        kind: Command,
    },
    {
        label: "ADDCOPYCHARA",
        kind: Command,
    },
    {
        label: "VARSIZE",
        kind: Command,
    },
    {
        label: "RESETDATA",
        kind: Command,
    },
    {
        label: "RESETGLOBAL",
        kind: Command,
    },
    {
        label: "RESET_STAIN",
        kind: Command,
    },
    {
        label: "SWAP",
        kind: Command,
    },
    {
        label: "CSVNAME",
        kind: Command,
    },
    {
        label: "CSVCALLNAME",
        kind: Command,
    },
    {
        label: "CSVNICKNAME",
        kind: Command,
    },
    {
        label: "CSVMASTERNAME",
        kind: Command,
    },
    {
        label: "CSVBASE",
        kind: Command,
    },
    {
        label: "CSVCSTR",
        kind: Command,
    },
    {
        label: "CSVABL",
        kind: Command,
    },
    {
        label: "CSVTALENT",
        kind: Command,
    },
    {
        label: "CSVMARK",
        kind: Command,
    },
    {
        label: "CSVEXP",
        kind: Command,
    },
    {
        label: "CSVRELATION",
        kind: Command,
    },
    {
        label: "CSVJUEL",
        kind: Command,
    },
    {
        label: "CSVEQUIP",
        kind: Command,
    },
    {
        label: "CSVCFLAG",
        kind: Command,
    },
    {
        label: "GETNUM",
        kind: Command,
    },
    {
        label: "GETPALAMLV",
        kind: Command,
    },
    {
        label: "GETEXPLV",
        kind: Command,
    },
    {
        label: "FINDELEMENT",
        kind: Command,
    },
    {
        label: "FINDLASTELEMENT",
        kind: Command,
    },
    {
        label: "VARSET",
        kind: Command,
    },
    {
        label: "CVARSET",
        kind: Command,
    },
    {
        label: "ARRAYSHIFT",
        kind: Command,
    },
    {
        label: "ARRAYREMOVE",
        kind: Command,
    },
    {
        label: "ARRAYSORT",
        kind: Command,
    },
    {
        label: "ARRAYCOPY",
        kind: Command,
    },
    {
        label: "CUPCHECK",
        kind: Command,
    },
    {
        label: "SAVEDATA",
        kind: Command,
    },
    {
        label: "LOADDATA",
        kind: Command,
    },
    {
        label: "DELDATA",
        kind: Command,
    },
    {
        label: "CHKDATA",
        kind: Command,
    },
    {
        label: "SAVENOS",
        kind: Command,
    },
    {
        label: "SAVEGLOBAL",
        kind: Command,
    },
    {
        label: "LOADGLOBAL",
        kind: Command,
    },
    {
        label: "OUTPUTLOG",
        kind: Command,
    },
    {
        label: "SAVECHARA",
        kind: Command,
    },
    {
        label: "LOADCHARA",
        kind: Command,
    },
    {
        label: "CHKCHARADATA",
        kind: Command,
    },
    {
        label: "FIND_CHARADATA",
        kind: Command,
    },
    {
        label: "GETTIME",
        kind: Command,
    },
    {
        label: "GETMILLISECOND",
        kind: Command,
    },
    {
        label: "GETSECOND",
        kind: Command,
    },
    {
        label: "FORCEWAIT",
        kind: Command,
    },
    {
        label: "INPUT",
        kind: Command,
    },
    {
        label: "INPUTS",
        kind: Command,
    },
    {
        label: "TINPUT",
        kind: Command,
    },
    {
        label: "TINPUTS",
        kind: Command,
    },
    {
        label: "TWAIT",
        kind: Command,
    },
    {
        label: "ONEINPUT",
        kind: Command,
    },
    {
        label: "ONEINPUTS",
        kind: Command,
    },
    {
        label: "TONEINPUT",
        kind: Command,
    },
    {
        label: "TONEINPUTS",
        kind: Command,
    },
    {
        label: "WAITANYKEY",
        kind: Command,
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
    },
    {
        label: "DUMPRAND",
        kind: Command,
    },
    {
        label: "INITRAND",
        kind: Command,
    },
    {
        label: "BEGIN",
        kind: Command,
    },
    {
        label: "CALLTRAIN",
        kind: Command,
    },
    {
        label: "DOTRAIN",
        kind: Command,
    },
    {
        label: "THROW",
        kind: Command,
    },
    {
        label: "CALL",
        kind: Command,
    },
    {
        label: "JUMP",
        kind: Command,
    },
    {
        label: "GOTO",
        kind: Command,
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
    },
    {
        label: "CALLFORMF",
        kind: Command,
    },
    {
        label: "CALLEVENT",
        kind: Command,
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
    },
    {
        label: "ASSERT",
        kind: Command,
    },
    {
        label: "TOOLTIP_SETCOLOR",
        kind: Command,
    },
    {
        label: "TOOLTIP_SETDELAY",
        kind: Command,
    },
    {
        label: "HTML_PRINT",
        kind: Command,
    },
    {
        label: "HTML_TAGSPLIT",
        kind: Command,
    },
    {
        label: "CLEARTEXTBOX",
        kind: Command,
    },
    {
        label: "STOPCALLTRAIN",
        kind: Command,
    },
    {
        label: "TIMES",
        kind: Command,
    },
    {
        label: "BAR",
        kind: Command,
    },
    {
        label: "BARL",
        kind: Command,
    },
    {
        label: "PUTFORM",
        kind: Command,
    },
    {
        label: "SAVEGAME",
        kind: Command,
    },
    {
        label: "LOADGAME",
        kind: Command,
    },
    {
        label: "WAIT",
        kind: Command,
    },
    {
        label: "RESTART",
        kind: Command,
    },
    {
        label: "QUIT",
        kind: Command,
    },
    {
        label: "TOOLTIP_SETDURATION",
        kind: Command,
    },
    {
        label: "AWAIT",
        kind: Command,
    },
    {
        label: "STRJOIN",
        kind: Function,
    },
    {
        label: "GETKEY",
        kind: Function,
    },
    {
        label: "GETKEYTRIGGERED",
        kind: Function,
    },
    {
        label: "MOUSEX",
        kind: Function,
    },
    {
        label: "MOUSEY",
        kind: Function,
    },
    {
        label: "ISACTIVE",
        kind: Function,
    },
    {
        label: "SAVETEXT",
        kind: Function,
    },
    {
        label: "LOADTEXT",
        kind: Function,
    },
    {
        label: "SPRITECREATED",
        kind: Function,
    },
    {
        label: "SPRITEWIDTH",
        kind: Function,
    },
    {
        label: "SPRITEHEIGHT",
        kind: Function,
    },
    {
        label: "SPRITEPOSX",
        kind: Function,
    },
    {
        label: "SPRITEPOSY",
        kind: Function,
    },
    {
        label: "SPRITESETPOS",
        kind: Function,
    },
    {
        label: "SPRITEMOVE",
        kind: Function,
    },
    {
        label: "ARRAYMSORT",
        kind: Function,
    },
    {
        label: "GCREATED",
        kind: Function,
    },
    {
        label: "GWIDTH",
        kind: Function,
    },
    {
        label: "GHEIGHT",
        kind: Function,
    },
    {
        label: "GGETCOLOR",
        kind: Function,
    },
    {
        label: "GCREATE",
        kind: Function,
    },
    {
        label: "GCREATEFROMFILE",
        kind: Function,
    },
    {
        label: "GDISPOSE",
        kind: Function,
    },
    {
        label: "GCLEAR",
        kind: Function,
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
    },
    {
        label: "RAND",
        kind: Function,
    },
    {
        label: "CBRT",
        kind: Function,
    },
    {
        label: "LOG",
        kind: Function,
    },
    {
        label: "LOG10",
        kind: Function,
    },
    {
        label: "EXPONENT",
        kind: Function,
    },
    {
        label: "SUMARRAY",
        kind: Function,
    },
    {
        label: "MATCH",
        kind: Function,
    },
    {
        label: "MAXARRAY",
        kind: Function,
    },
    {
        label: "MINARRAY",
        kind: Function,
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
