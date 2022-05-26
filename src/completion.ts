import { CompletionItem, CompletionItemKind } from "vscode";

const Keyword = CompletionItemKind.Keyword;
const Control = CompletionItemKind.Keyword;
const Command = CompletionItemKind.Function;   // 命令と呼ばれてるもののうち、関数では無いもの
const Function = CompletionItemKind.Function;  // 関数と呼ばれてるもの (Emueraの仕様上、全ての式中関数は命令としても機能する)
const Variable = CompletionItemKind.Variable;

type NLSLocale = "ja" | "en";

class NLSCompletionItem extends CompletionItem {
    nlsDetail?: { [locale in NLSLocale]?: string };
}

function localizedComplationItems(items: NLSCompletionItem[]): CompletionItem[] {
    const conf = process.env.VSCODE_NLS_CONFIG ? JSON.parse(process.env.VSCODE_NLS_CONFIG) : {};
    const locale = conf.locale || "en";
    return items.map((item) => {
        if (item.detail === undefined && item.nlsDetail !== undefined) {
            item.detail = item.nlsDetail[locale] || item.nlsDetail["ja"];
            delete item.nlsDetail;
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
        nlsDetail: { "ja": "文字列を表示", "en": "Show String" },
    },
    {
        label: "PRINTL",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+改行", "en": "Show String + Line Break" },
    },
    {
        label: "PRINTW",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+待機", "en": "Show String + Wait" },
    },
    {
        label: "PRINTK",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+カナ強制", "en": "Show String + Forced Kana" },
    },
    {
        label: "PRINTKL",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+カナ強制+改行", "en": "Show String + Forced Kana + Line Break" },
    },
    {
        label: "PRINTKW",
        kind: Command,
        nlsDetail: { "ja": "文字列を表示+カナ強制+待機", "en": "Show String + Forced Kana + Wait" },
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
        nlsDetail: { "ja": "PRINTDATA(STRDATA)～ENDDATA内にあるDATAを等確率でランダム表示", "en": "" },
    },
    {
        label: "DATAFORM",
        kind: Command,
        nlsDetail: { "ja": "PRINTDATA(STRDATA)～ENDDATA内にあるDATAを等確率でランダム表示+書式付文字列", "en": "" },
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
        nlsDetail: { "ja": "引数のカラーコードで文字色を変更", "en": "" },
    },
    {
        label: "RESETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "文字色をデフォルトにリセット", "en": "" },
    },
    {
        label: "SETBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "引数のカラーコードで背景色を変更", "en": "" },
    },
    {
        label: "RESETBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "背景色をデフォルトにリセット", "en": "" },
    },
    {
        label: "SETCOLORBYNAME",
        kind: Command,
        nlsDetail: { "ja": "引数の色名で文字色を変更", "en": "" },
    },
    {
        label: "SETBGCOLORBYNAME",
        kind: Command,
        nlsDetail: { "ja": "引数の色名で背景色を変更", "en": "" },
    },
    {
        label: "GETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "現在の文字色を16進数で取得", "en": "" },
    },
    {
        label: "GETDEFCOLOR",
        kind: Command,
        nlsDetail: { "ja": "デフォルトの文字色を16進数で取得", "en": "" },
    },
    {
        label: "GETBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "現在の背景色を16進数で取得", "en": "" },
    },
    {
        label: "GETDEFBGCOLOR",
        kind: Command,
        nlsDetail: { "ja": "デフォルトの背景色を16進数で取得", "en": "" },
    },
    {
        label: "GETFOCUSCOLOR",
        kind: Command,
        nlsDetail: { "ja": "マウスオーバー時の文字色を16進数で取得", "en": "" },
    },
    {
        label: "FONTBOLD",
        kind: Command,
        nlsDetail: { "ja": "太字フォントに変更", "en": "" },
    },
    {
        label: "FONTITALIC",
        kind: Command,
        nlsDetail: { "ja": "斜体フォントに変更", "en": "" },
    },
    {
        label: "FONTREGULAR",
        kind: Command,
        nlsDetail: { "ja": "フォント変更を解除", "en": "" },
    },
    {
        label: "FONTSTYLE",
        kind: Command,
        nlsDetail: { "ja": "ビット指定でフォントを変更 1=太字 2=斜体 4=打ち消し線 8=下線", "en": "" },
    },
    {
        label: "GETSTYLE",
        kind: Command,
        nlsDetail: { "ja": "現在のフォントをビット数で取得 1=太字 2=斜体 4=打ち消し線 8=下線", "en": "" },
    },
    {
        label: "CHKFONT",
        kind: Command,
        nlsDetail: { "ja": "指定したフォントがインストールされているかの確認", "en": "" },
    },
    {
        label: "SETFONT",
        kind: Command,
        nlsDetail: { "ja": "指定のフォントに変更", "en": "" },
    },
    {
        label: "GETFONT",
        kind: Command,
        nlsDetail: { "ja": "現在使用中のフォント名を取得", "en": "" },
    },
    {
        label: "FORCEKANA",
        kind: Command,
        nlsDetail: { "ja": "ひらがな・カタカナを自動変換 0=変換無し 1=ひらがな→カタカナ 2=カタカナ→ひらがな(全角のみ) 3=カタカナ→ひらがな(半角含む)", "en": "" },
    },
    {
        label: "ALIGNMENT",
        kind: Command,
        nlsDetail: { "ja": "文字の表示位置変更(LEFT、CENTER、RIGHT)", "en": "" },
    },
    {
        label: "CURRENTALIGN",
        kind: Command,
        nlsDetail: { "ja": "現在の文字表示位置を取得(RESULTS:0に代入)", "en": "" },
    },
    {
        label: "REDRAW",
        kind: Command,
        nlsDetail: { "ja": "描画タイミングの変更(0=デフォルト 1=フレーム毎秒コンフィグを使用 2=1の動作に加え命令時に強制描画)", "en": "" },
    },
    {
        label: "CURRENTREDRAW",
        kind: Command,
        nlsDetail: { "ja": "REDRAWを状態を取得", "en": "" },
    },
    {
        label: "PRINTCPERLINE",
        kind: Command,
        nlsDetail: { "ja": "コンフフィグ[PRINTCを並べる数]を取得", "en": "" },
    },
    {
        label: "LINEISEMPTY",
        kind: Command,
        nlsDetail: { "ja": "現時点での改行が空行になる場合に1を返す", "en": "" },
    },
    {
        label: "BARSTR",
        kind: Command,
        nlsDetail: { "ja": "BAR命令で表示される文字列をRESULTSに代入", "en": "" },
    },
    {
        label: "MONEYSTR",
        kind: Command,
        nlsDetail: { "ja": "引数に_replace.csv[お金の単位]を添えた文字列を返す", "en": "" },
    },
    {
        label: "SKIPDISP",
        kind: Command,
        nlsDetail: { "ja": "全てのPRINT等が描画されなくなる INPUT系に到達するとエラーになる", "en": "" },
    },
    {
        label: "ISSKIP",
        kind: Command,
        nlsDetail: { "ja": "SKIPDISPが実行中かどうかを返す", "en": "" },
    },
    {
        label: "MOUSESKIP",
        kind: Command,
        nlsDetail: { "ja": "右クリックでのスキップ実行中かどうかを返す", "en": "" },
    },
    {
        label: "TOUPPER",
        kind: Command,
        nlsDetail: { "ja": "引数のアルファベットを大文字に変換", "en": "" },
    },
    {
        label: "TOLOWER",
        kind: Command,
        nlsDetail: { "ja": "引数のアルファベットを小文字に変換", "en": "" },
    },
    {
        label: "TOHALF",
        kind: Command,
        nlsDetail: { "ja": "引数の全角文字を半角に変換 変換不可の場合はそのまま", "en": "" },
    },
    {
        label: "TOFULL",
        kind: Command,
        nlsDetail: { "ja": "引数の半角文字を全角に変換", "en": "" },
    },
    {
        label: "TOSTR",
        kind: Command,
        nlsDetail: { "ja": "引数の数値を文字列式に変換", "en": "" },
    },
    {
        label: "ISNUMERIC",
        kind: Command,
        nlsDetail: { "ja": "TOINTでint型に変換可能か確認", "en": "" },
    },
    {
        label: "TOINT",
        kind: Command,
        nlsDetail: { "ja": "引数の文字列をint型に変換", "en": "" },
    },
    {
        label: "STRLEN",
        kind: Command,
        nlsDetail: { "ja": "引数の文字数を取得 全角は2文字扱い", "en": "" },
    },
    {
        label: "STRLENU",
        kind: Command,
        nlsDetail: { "ja": "引数の文字数を取得 全角も1文字扱い", "en": "" },
    },
    {
        label: "STRLENS",
        kind: Command,
        nlsDetail: { "ja": "STRLENの文字列式リテラル版", "en": "" },
    },
    {
        label: "STRLENSU",
        kind: Command,
        nlsDetail: { "ja": "STRLENUの文字列式リテラル版", "en": "" },
    },
    {
        label: "STRLENFORM",
        kind: Command,
        nlsDetail: { "ja": "STRLENの書式付文字列リテラル版", "en": "" },
    },
    {
        label: "STRLENFORMU",
        kind: Command,
        nlsDetail: { "ja": "STRLENUの書式付文字列リテラル版", "en": "" },
    },
    {
        label: "SUBSTRING",
        kind: Command,
        nlsDetail: { "ja": "文字列式の指定部分を取得 全角は2文字扱い", "en": "" },
    },
    {
        label: "SUBSTRINGU",
        kind: Command,
        nlsDetail: { "ja": "文字列式の指定部分を取得 全角も1文字扱い", "en": "" },
    },
    {
        label: "CHARATU",
        kind: Command,
        nlsDetail: { "ja": "文字列式の指定部分の1文字のみ取得 全角も1文字扱い", "en": "" },
    },
    {
        label: "STRFIND",
        kind: Command,
        nlsDetail: { "ja": "文字列式から指定の文字列式で検索(全角は2文字扱い) ×正規表現使用不可", "en": "" },
    },
    {
        label: "STRFINDU",
        kind: Command,
        nlsDetail: { "ja": "文字列式から指定の文字列式で検索(全角も1文字扱い) ×正規表現使用不可", "en": "" },
    },
    {
        label: "STRCOUNT",
        kind: Command,
        nlsDetail: { "ja": "文字列式から指定の文字列パターンに一致する数を取得 ○正規表現使用可", "en": "" },
    },
    {
        label: "SPLIT",
        kind: Command,
        nlsDetail: { "ja": "文字列を指定の文字列で分割し、第三引数の文字列変数に代入 ×正規表現使用不可", "en": "" },
    },
    {
        label: "REPLACE",
        kind: Command,
        nlsDetail: { "ja": "文字列を指定のパターンで検索し、第三引数で置き換える ○正規表現使用可", "en": "" },
    },
    {
        label: "ESCAPE",
        kind: Command,
        nlsDetail: { "ja": "エスケープ文字を用いて正規表現が適用されない平文の形に変換する", "en": "" },
    },
    {
        label: "UNICODE",
        kind: Command,
        nlsDetail: { "ja": "指定されたUNICODE文字を取得", "en": "" },
    },
    {
        label: "ENCODETOUNI",
        kind: Command,
        nlsDetail: { "ja": "UNICODE変換後の文字数、バイト数を返す", "en": "" },
    },
    {
        label: "POWER",
        kind: Command,
        nlsDetail: { "ja": "第一引数に第二引数^第三引数(累乗)の値を代入する", "en": "" },
    },
    {
        label: "ABS",
        kind: Command,
        nlsDetail: { "ja": "引数の絶対値を返す", "en": "" },
    },
    {
        label: "SIGN",
        kind: Command,
        nlsDetail: { "ja": "引数の符号を返す 負の値=-1 0=0 正の値=1", "en": "" },
    },
    {
        label: "SQRT",
        kind: Command,
        nlsDetail: { "ja": "引数の平方根を返す", "en": "" },
    },
    {
        label: "GETBIT",
        kind: Command,
        nlsDetail: { "ja": "指定したビットの状態を返す", "en": "" },
    },
    {
        label: "MAX",
        kind: Command,
        nlsDetail: { "ja": "引数の中で最大の値を返す", "en": "" },
    },
    {
        label: "MIN",
        kind: Command,
        nlsDetail: { "ja": "引数の中で最小の値を返す", "en": "" },
    },
    {
        label: "LIMIT",
        kind: Command,
        nlsDetail: { "ja": "第一引数を第二引数～第三引数の範囲内に留めて返す", "en": "" },
    },
    {
        label: "INRANGE",
        kind: Command,
        nlsDetail: { "ja": "第一引数が第二引数～第三引数の範囲内なら1を返す", "en": "" },
    },
    {
        label: "SETBIT",
        kind: Command,
        nlsDetail: { "ja": "指定したビットを1にする", "en": "" },
    },
    {
        label: "CLEARBIT",
        kind: Command,
        nlsDetail: { "ja": "指定したビットを0にする", "en": "" },
    },
    {
        label: "INVERTBIT",
        kind: Command,
        nlsDetail: { "ja": "指定したビットを反転させる", "en": "" },
    },
    {
        label: "ADDCHARA",
        kind: Command,
        nlsDetail: { "ja": "CSVからキャラクターを追加する", "en": "" },
    },
    {
        label: "DELCHARA",
        kind: Command,
        nlsDetail: { "ja": "キャラクターを消去する", "en": "" },
    },
    {
        label: "SWAPCHARA",
        kind: Command,
        nlsDetail: { "ja": "キャラクターのIDを入れ替える", "en": "" },
    },
    {
        label: "SORTCHARA",
        kind: Command,
        nlsDetail: { "ja": "キャラクターをキャラクタ変数でソートする", "en": "" },
    },
    {
        label: "GETCHARA",
        kind: Command,
        nlsDetail: { "ja": "NO:XXXのキャラクターのIDを返す", "en": "" },
    },
    {
        label: "ADDDEFCHARA",
        kind: Command,
        nlsDetail: { "ja": "gamebase.csvで設定した初期キャラを追加する ※SYSTEM_TITLE内でのみ実行可能", "en": "" },
    },
    {
        label: "ADDVOIDCHARA",
        kind: Command,
        nlsDetail: { "ja": "全てのキャラクタ変数が0及び空文字列のキャラを追加する", "en": "" },
    },
    {
        label: "DELALLCHARA",
        kind: Command,
        nlsDetail: { "ja": "全てのキャラクターを消去する", "en": "" },
    },
    {
        label: "PICKUPCHARA",
        kind: Command,
        nlsDetail: { "ja": "指定したIDのキャラを残し、それ以外を全て消去する", "en": "" },
    },
    {
        label: "EXISTCSV",
        kind: Command,
        nlsDetail: { "ja": "NO:XXXのCSVが存在するかを確認", "en": "" },
    },
    {
        label: "FINDCHARA",
        kind: Command,
        nlsDetail: { "ja": "第一引数のキャラクタ変数が第二引数と一致する最初のキャラIDを取得", "en": "" },
    },
    {
        label: "FINDLASTCHARA",
        kind: Command,
        nlsDetail: { "ja": "第一引数のキャラクタ変数が第二引数と一致する最後のキャラIDを取得", "en": "" },
    },
    {
        label: "COPYCHARA",
        kind: Command,
        nlsDetail: { "ja": "第一引数のIDのキャラを第二引数のIDにコピーする", "en": "" },
    },
    {
        label: "ADDCOPYCHARA",
        kind: Command,
        nlsDetail: { "ja": "指定したIDのキャラと同じデータのキャラを追加する", "en": "" },
    },
    {
        label: "VARSIZE",
        kind: Command,
        nlsDetail: { "ja": "指定した変数の要素数を返す 多次元配列はRESULT:0~2に代入される", "en": "" },
    },
    {
        label: "RESETDATA",
        kind: Command,
        nlsDetail: { "ja": "GLOBALとGLOBALSを除く全ての変数を初期化する", "en": "" },
    },
    {
        label: "RESETGLOBAL",
        kind: Command,
        nlsDetail: { "ja": "GLOBALとGLOBALSを初期化する", "en": "" },
    },
    {
        label: "RESET_STAIN",
        kind: Command,
        nlsDetail: { "ja": "_replace.csv[汚れの初期値]の設定でSTAINを初期化する", "en": "" },
    },
    {
        label: "SWAP",
        kind: Command,
        nlsDetail: { "ja": "2変数間の値を入れ替える", "en": "" },
    },
    {
        label: "CSVNAME",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのNAME(名前)をCSVから取得", "en": "" },
    },
    {
        label: "CSVCALLNAME",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのCALLNAME(呼び名)をCSVから取得", "en": "" },
    },
    {
        label: "CSVNICKNAME",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのNICKNAME(あだ名)をCSVから取得", "en": "" },
    },
    {
        label: "CSVMASTERNAME",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのMASTERNAME(主人の呼び方)をCSVから取得", "en": "" },
    },
    {
        label: "CSVBASE",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのBASE(基礎)をCSVから取得", "en": "" },
    },
    {
        label: "CSVCSTR",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのCSTRをCSVから取得", "en": "" },
    },
    {
        label: "CSVABL",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのABL(能力)をCSVから取得", "en": "" },
    },
    {
        label: "CSVTALENT",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのTALENT(素質)をCSVから取得", "en": "" },
    },
    {
        label: "CSVMARK",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのMARK(刻印)をCSVから取得", "en": "" },
    },
    {
        label: "CSVEXP",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのEXP(経験)をCSVから取得", "en": "" },
    },
    {
        label: "CSVRELATION",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのRELATION(相性)をCSVから取得", "en": "" },
    },
    {
        label: "CSVJUEL",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのJUEL(珠)をCSVから取得", "en": "" },
    },
    {
        label: "CSVEQUIP",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのEQUIP(装着物)をCSVから取得", "en": "" },
    },
    {
        label: "CSVCFLAG",
        kind: Command,
        nlsDetail: { "ja": "指定したNO:XXXのCFLAG(フラグ)をCSVから取得", "en": "" },
    },
    {
        label: "GETNUM",
        kind: Command,
        nlsDetail: { "ja": "CSVで定義されてる名称から配列番号を取得", "en": "" },
    },
    {
        label: "GETPALAMLV",
        kind: Command,
        nlsDetail: { "ja": "_replace.csv[PALAMLVの初期値]を基準にしたレベルを算出する", "en": "" },
    },
    {
        label: "GETEXPLV",
        kind: Command,
        nlsDetail: { "ja": "_replace.csv[EXPLVの初期値]を基準にしたレベルを算出する", "en": "" },
    },
    {
        label: "FINDELEMENT",
        kind: Command,
        nlsDetail: { "ja": "第一引数の配列から、第二引数で指定した要素を検索、最初にヒットした配列を返す ○正規表現使用可", "en": "" },
    },
    {
        label: "FINDLASTELEMENT",
        kind: Command,
        nlsDetail: { "ja": "第一引数の配列から、第二引数で指定した要素を検索、最後にヒットした配列を返す ○正規表現使用可", "en": "" },
    },
    {
        label: "VARSET",
        kind: Command,
        nlsDetail: { "ja": "指定した変数の、指定範囲の配列に同じ値を代入or初期化する", "en": "" },
    },
    {
        label: "CVARSET",
        kind: Command,
        nlsDetail: { "ja": "指定した範囲のキャラの、キャラクタ変数に同じ値を代入or初期化する", "en": "" },
    },
    {
        label: "ARRAYSHIFT",
        kind: Command,
        nlsDetail: { "ja": "指定した変数の配列を、指定した方向にずらし、初期値を代入する ×多次元配列使用不可", "en": "" },
    },
    {
        label: "ARRAYREMOVE",
        kind: Command,
        nlsDetail: { "ja": "指定した変数の、指定範囲内の配列を初期化する ×多次元配列使用不可", "en": "" },
    },
    {
        label: "ARRAYSORT",
        kind: Command,
        nlsDetail: { "ja": "指定した変数の配列を、指定の条件でソートする ×多次元配列使用不可", "en": "" },
    },
    {
        label: "ARRAYCOPY",
        kind: Command,
        nlsDetail: { "ja": "指定した変数を配列ごと別の変数にコピーする ○多次元配列使用可", "en": "" },
    },
    {
        label: "CUPCHECK",
        kind: Command,
        nlsDetail: { "ja": "指定した対象にCUP、CDOWNを使用したUPCHECK処理を行う", "en": "" },
    },
    {
        label: "SAVEDATA",
        kind: Command,
        nlsDetail: { "ja": "指定した番号のセーブデータスロットにセーブする", "en": "" },
    },
    {
        label: "LOADDATA",
        kind: Command,
        nlsDetail: { "ja": "指定した番号のセーブデータをロードする", "en": "" },
    },
    {
        label: "DELDATA",
        kind: Command,
        nlsDetail: { "ja": "指定した番号のセーブデータを消去する", "en": "" },
    },
    {
        label: "CHKDATA",
        kind: Command,
        nlsDetail: { "ja": "指定した番号のセーブデータ状態を確認する 0=ロード可能 1=データ無し 2=ゲームコード不一致 3=バージョン互換無し 4=それ以外", "en": "" },
    },
    {
        label: "SAVENOS",
        kind: Command,
        nlsDetail: { "ja": "コンフィグ[表示するセーブデータ数]の数値を取得", "en": "" },
    },
    {
        label: "SAVEGLOBAL",
        kind: Command,
        nlsDetail: { "ja": "グローバル変数をセーブする", "en": "" },
    },
    {
        label: "LOADGLOBAL",
        kind: Command,
        nlsDetail: { "ja": "グローバル変数をロードする", "en": "" },
    },
    {
        label: "OUTPUTLOG",
        kind: Command,
        nlsDetail: { "ja": "ログをUnicodeで出力する", "en": "" },
    },
    {
        label: "SAVECHARA",
        kind: Command,
        nlsDetail: { "ja": "指定したキャラクタを外部ファイルでセーブする", "en": "" },
    },
    {
        label: "LOADCHARA",
        kind: Command,
        nlsDetail: { "ja": "外部ファイルでセーブされたキャラをロードする", "en": "" },
    },
    {
        label: "CHKCHARADATA",
        kind: Command,
        nlsDetail: { "ja": "LOADCHARAで読み込み可能なファイルか確認", "en": "" },
    },
    {
        label: "FIND_CHARADATA",
        kind: Command,
        nlsDetail: { "ja": "LOADCHARAで読み込み可能なファイル名を検索", "en": "" },
    },
    {
        label: "GETTIME",
        kind: Command,
        nlsDetail: { "ja": "パソコンの現在日時を取得", "en": "" },
    },
    {
        label: "GETMILLISECOND",
        kind: Command,
        nlsDetail: { "ja": "西暦0001年1月1日からの経過時間をミリ秒単位で取得", "en": "" },
    },
    {
        label: "GETSECOND",
        kind: Command,
        nlsDetail: { "ja": "西暦0001年1月1日からの経過時間を秒単位で取得", "en": "" },
    },
    {
        label: "FORCEWAIT",
        kind: Command,
        nlsDetail: { "ja": "右クリック、マクロでスキップできないWAIT命令", "en": "" },
    },
    {
        label: "INPUT",
        kind: Command,
        nlsDetail: { "ja": "数字の入力受付", "en": "" },
    },
    {
        label: "INPUTS",
        kind: Command,
        nlsDetail: { "ja": "文字列の入力受付", "en": "" },
    },
    {
        label: "TINPUT",
        kind: Command,
        nlsDetail: { "ja": "制限時間付きの数字入力受付", "en": "" },
    },
    {
        label: "TINPUTS",
        kind: Command,
        nlsDetail: { "ja": "制限時間付きの文字列入力受付", "en": "" },
    },
    {
        label: "TWAIT",
        kind: Command,
        nlsDetail: { "ja": "指定時間経過で自動的に進むWAIT命令", "en": "" },
    },
    {
        label: "ONEINPUT",
        kind: Command,
        nlsDetail: { "ja": "数字1桁のみの入力受付", "en": "" },
    },
    {
        label: "ONEINPUTS",
        kind: Command,
        nlsDetail: { "ja": "1文字のみの入力受付", "en": "" },
    },
    {
        label: "TONEINPUT",
        kind: Command,
        nlsDetail: { "ja": "制限時間付きの数字1桁入力受付", "en": "" },
    },
    {
        label: "TONEINPUTS",
        kind: Command,
        nlsDetail: { "ja": "制限時間付きの1文字入力受付", "en": "" },
    },
    {
        label: "WAITANYKEY",
        kind: Command,
        nlsDetail: { "ja": "いずれかのキー入力、もしくはマウスクリックを待つWAIT命令", "en": "" },
    },
    {
        label: "BREAK",
        kind: Command,
        nlsDetail: { "ja": "現在実行中のループを強制終了する", "en": "" },
    },
    {
        label: "CONTINUE",
        kind: Command,
        nlsDetail: { "ja": "現在実行中のループの頭に戻り、COUNT系変数は同様に加算(減算)する", "en": "" },
    },
    {
        label: "RANDOMIZE",
        kind: Command,
        nlsDetail: { "ja": "乱数テーブルを指定の値で初期化、生成する", "en": "" },
    },
    {
        label: "DUMPRAND",
        kind: Command,
        nlsDetail: { "ja": "現在の乱数テーブルをRANDDATA変数に保存する", "en": "" },
    },
    {
        label: "INITRAND",
        kind: Command,
        nlsDetail: { "ja": "RANDDATAに保存された値で乱数テーブルを初期化、生成する", "en": "" },
    },
    {
        label: "BEGIN",
        kind: Command,
        nlsDetail: { "ja": "イベント関数を呼び出す", "en": "" },
    },
    {
        label: "CALLTRAIN",
        kind: Command,
        nlsDetail: { "ja": "SELECTCOM:1～nの配列に代入されたコマンドを連続実行する", "en": "" },
    },
    {
        label: "DOTRAIN",
        kind: Command,
        nlsDetail: { "ja": "指定したコマンドでTRAIN系処理を強制的に行う", "en": "" },
    },
    {
        label: "THROW",
        kind: Command,
        nlsDetail: { "ja": "この命令に到達するとエラーログを表示する", "en": "" },
    },
    {
        label: "CALL",
        kind: Command,
        nlsDetail: { "ja": "指定の関数を呼び出す", "en": "" },
    },
    {
        label: "JUMP",
        kind: Command,
        nlsDetail: { "ja": "現在の関数を終了し、指定の関数を呼び出す", "en": "" },
    },
    {
        label: "GOTO",
        kind: Command,
        nlsDetail: { "ja": "同じ関数内で記述されたラベルの行に移動する", "en": "" },
    },
    {
        label: "CALLFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を用いて関数を呼び出す", "en": "" },
    },
    {
        label: "JUMPFORM",
        kind: Command,
        nlsDetail: { "ja": "現在の関数を終了し、書式付文字列を用いて関数を呼び出す", "en": "" },
    },
    {
        label: "GOTOFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を用いて、同じ関数内で記述されたラベルの行に移動する", "en": "" },
    },
    {
        label: "TRYCALL",
        kind: Command,
        nlsDetail: { "ja": "指定した関数を呼び出す+関数不在エラー無し", "en": "" },
    },
    {
        label: "TRYJUMP",
        kind: Command,
        nlsDetail: { "ja": "現在の関数を終了し、指定した関数を呼び出す+関数不在エラー無し", "en": "" },
    },
    {
        label: "TRYGOTO",
        kind: Command,
        nlsDetail: { "ja": "同じ関数内で記述されたラベルの行に移動+ラベル不在エラー無し", "en": "" },
    },
    {
        label: "TRYCALLFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を用いて関数を呼び出す+関数不在エラー無し", "en": "" },
    },
    {
        label: "TRYJUMPFORM",
        kind: Command,
        nlsDetail: { "ja": "現在の関数を終了し、書式付文字列を用いて関数を呼び出す+関数不在エラー無し", "en": "" },
    },
    {
        label: "TRYGOTOFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を用いて同じ関数内のラベルを呼び出す+ラベル不在エラー無し", "en": "" },
    },
    {
        label: "CALLF",
        kind: Command,
        nlsDetail: { "ja": "FUNCTION(S)属性の関数を呼び出す RETURNFの値は破棄される", "en": "" },
    },
    {
        label: "CALLFORMF",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を用いてFUNCTION属性の関数を呼び出す RETURNFの値は破棄される", "en": "" },
    },
    {
        label: "CALLEVENT",
        kind: Command,
        nlsDetail: { "ja": "イベント関数をイベント関数として呼び出す", "en": "" },
    },
    {
        label: "FUNC",
        kind: Command,
        nlsDetail: { "ja": "LIST系～ENDFUNC内で呼び出される関数", "en": "" },
    },
    {
        label: "RETURN",
        kind: Command,
        nlsDetail: { "ja": "返り値を指定して関数を終了する", "en": "" },
    },
    {
        label: "RETURNFORM",
        kind: Command,
        nlsDetail: { "ja": "書式付文字列を用いて返り値を指定し、関数を終了する", "en": "" },
    },
    {
        label: "RETURNF",
        kind: Command,
        nlsDetail: { "ja": "FUNCTION(S)属性内で使用可能なRETURN命令", "en": "" },
    },
    {
        label: "DEBUGPRINT",
        kind: Command,
        nlsDetail: { "ja": "デバッグコンソールにPRINTを行う", "en": "" },
    },
    {
        label: "DEBUGPRINTL",
        kind: Command,
        nlsDetail: { "ja": "デバッグコンソールにPRINTLを行う", "en": "" },
    },
    {
        label: "DEBUGPRINTFORM",
        kind: Command,
        nlsDetail: { "ja": "デバッグコンソールにPRINTFORMを行う", "en": "" },
    },
    {
        label: "DEBUGPRINTFORML",
        kind: Command,
        nlsDetail: { "ja": "デバッグコンソールにPRINTFORMLを行う", "en": "" },
    },
    {
        label: "DEBUGCLEAR",
        kind: Command,
        nlsDetail: { "ja": "デバッグコンソールのPRINT内容を全て削除する", "en": "" },
    },
    {
        label: "ASSERT",
        kind: Command,
        nlsDetail: { "ja": "引数に0が渡された場合にのみエラー終了する", "en": "" },
    },
    {
        label: "TOOLTIP_SETCOLOR",
        kind: Command,
        nlsDetail: { "ja": "ツールチップの前景色及び背景色を0xRRGGBB形式で設定", "en": "" },
    },
    {
        label: "TOOLTIP_SETDELAY",
        kind: Command,
        nlsDetail: { "ja": "ツールチップが表示されるまでの時間をミリ秒単位で設定", "en": "" },
    },
    {
        label: "HTML_PRINT",
        kind: Command,
        nlsDetail: { "ja": "html同等のタグを使用して描画", "en": "" },
    },
    {
        label: "HTML_TAGSPLIT",
        kind: Command,
        nlsDetail: { "ja": "html同等の文字列と解釈してタグごとにSPLITする", "en": "" },
    },
    {
        label: "CLEARTEXTBOX",
        kind: Command,
        nlsDetail: { "ja": "ゲームプレイ時の最下部の入力欄を消去する", "en": "" },
    },
    {
        label: "STOPCALLTRAIN",
        kind: Command,
        nlsDetail: { "ja": "実行中のCALLTRAIN処理を終了する", "en": "" },
    },
    {
        label: "TIMES",
        kind: Command,
        nlsDetail: { "ja": "少数第二位まで記述可能な乗算処理", "en": "" },
    },
    {
        label: "BAR",
        kind: Command,
        nlsDetail: { "ja": "指定した数値で指定した長さのグラフを表示", "en": "" },
    },
    {
        label: "BARL",
        kind: Command,
        nlsDetail: { "ja": "BAR+改行", "en": "" },
    },
    {
        label: "PUTFORM",
        kind: Command,
        nlsDetail: { "ja": "SAVEINFO関数内で使用可能 セーブデータにコメントを付ける", "en": "" },
    },
    {
        label: "SAVEGAME",
        kind: Command,
        nlsDetail: { "ja": "システムで用意されたセーブ画面に移行する", "en": "" },
    },
    {
        label: "LOADGAME",
        kind: Command,
        nlsDetail: { "ja": "システムで用意されたロード画面に移行する", "en": "" },
    },
    {
        label: "WAIT",
        kind: Command,
        nlsDetail: { "ja": "プレイヤーのEnterキーもしくはマウス入力を待つ", "en": "" },
    },
    {
        label: "RESTART",
        kind: Command,
        nlsDetail: { "ja": "関数の頭から再実行する DYNAMIC変数は初期化されない", "en": "" },
    },
    {
        label: "QUIT",
        kind: Command,
        nlsDetail: { "ja": "ゲームを終了する", "en": "" },
    },
    {
        label: "TOOLTIP_SETDURATION",
        kind: Command,
        nlsDetail: { "ja": "ツールチップの表示時間をミリ秒単位で設定", "en": "" },
    },
    {
        label: "AWAIT",
        kind: Command,
        nlsDetail: { "ja": "ERBの実行を一時停止 膨大なオーダーでの無限ループ判定を防ぐ", "en": "" },
    },
    {
        label: "STRJOIN",
        kind: Function,
        nlsDetail: { "ja": "指定文字列変数の配列の値を連結させる", "en": "" },
    },
    {
        label: "GETKEY",
        kind: Function,
        nlsDetail: { "ja": "命令実行時点で指定のキーが押下されているか確認", "en": "" },
    },
    {
        label: "GETKEYTRIGGERED",
        kind: Function,
        nlsDetail: { "ja": "命令実行時点で指定のキーが押されたか確認", "en": "" },
    },
    {
        label: "MOUSEX",
        kind: Function,
        nlsDetail: { "ja": "マウスカーソルのX座標を返す", "en": "" },
    },
    {
        label: "MOUSEY",
        kind: Function,
        nlsDetail: { "ja": "マイスカーソルのY座標を返す", "en": "" },
    },
    {
        label: "ISACTIVE",
        kind: Function,
        nlsDetail: { "ja": "Emueraのウィンドウがアクティブかどうかを返す", "en": "" },
    },
    {
        label: "SAVETEXT",
        kind: Function,
        nlsDetail: { "ja": "テキストを指定したナンバーで外部ファイルに保存する", "en": "" },
    },
    {
        label: "LOADTEXT",
        kind: Function,
        nlsDetail: { "ja": "指定したナンバーの外部ファイルを読み込む", "en": "" },
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
	//#region EE+EM
    {
        label: "QUIT_AND_RESTART",
        kind: Command,
        nlsDetail: { "ja": "再起動命令 QUIT同様に1回のWAITを挟む", "en": "" },
    },
    {
        label: "FORCE_QUIT",
        kind: Command,
        nlsDetail: { "ja": "WAITを挟まずに強制終了する", "en": "" },
    },
    {
        label: "FORCE_QUIT_AND_RESTART",
        kind: Command,
        nlsDetail: { "ja": "WAITを挟まずに強制再起動する 連続実行された場合はダイアログボックスで警告が出る", "en": "" },
    },
    {
        label: "FORCE_BEGIN",
        kind: Command,
        nlsDetail: { "ja": "常に使用可能なBEGIN フローの制約を受けない", "en": "" },
    },
    {
        label: "STOPSOUND",
        kind: Command,
        nlsDetail: { "ja": "PLAYSOUNDで再生中の音声を停止する", "en": "" },
    },
    {
        label: "STOPBGM",
        kind: Command,
        nlsDetail: { "ja": "PLAYBGMで再生中の音声を停止する", "en": "" },
    },
    {
        label: "SETSOUNDVOLUME",
        kind: Command,
        nlsDetail: { "ja": "PLAYSOUNDの音量を変更する 0～100を指定可能", "en": "" },
    },
    {
        label: "SETBGMVOLUME",
        kind: Command,
        nlsDetail: { "ja": "PLAYBGMの音量を変更する 0～100を指定可能", "en": "" },
    },
    {
        label: "UPDATECHECK",
        kind: Command,
        nlsDetail: { "ja": "アップデートを確認する 詳細はEM+EEのリファレンスを参照", "en": "" },
    },
    {
        label: "TRYCALLF",
        kind: Command,
        nlsDetail: { "ja": "TRYを用いてCALLFする 関数が存在しなくともエラーにならないが、返り値は破棄される", "en": "" },
    },
    {
        label: "TRYCALLFORMF",
        kind: Command,
        nlsDetail: { "ja": "TRYを用いてCALLFORMFする 関数が存在しなくともエラーにならないが、返り値は破棄される", "en": "" },
    },
    {
        label: "HTML_STRINGLEN",
        kind: Function,
        nlsDetail: { "ja": "引数をHTML_PRINTで表示した際の幅を返す", "en": "" },
    },
    {
        label: "HTML_SUBSTRING",
        kind: Function,
        nlsDetail: { "ja": "引数をHTML_PRINTで表示した結果からSUBSTRINGする", "en": "" },
    },
    {
        label: "REGEXPMATCH",
        kind: Function,
        nlsDetail: { "ja": "第一引数が第二引数の正規表現パターンに合うなら一致数を返す", "en": "" },
    },
    {
        label: "ISDEFINED",
        kind: Function,
        nlsDetail: { "ja": "引数のマクロが定義されてるかを確認する", "en": "" },
    },
    {
        label: "EXISTVAR",
        kind: Function,
        nlsDetail: { "ja": "引数の変数が定義されてるかを確認する", "en": "" },
    },
    {
        label: "ENUMFUNCBEGINSWITH",
        kind: Function,
        nlsDetail: { "ja": "引数で始まる関数の総数を返す", "en": "" },
    },
    {
        label: "ENUMVARBEGINSWITH",
        kind: Function,
        nlsDetail: { "ja": "引数で始まる変数の総数を返す", "en": "" },
    },
    {
        label: "ENUMMACROBEGINSWITH",
        kind: Function,
        nlsDetail: { "ja": "引数で始まるマクロの総数を返す", "en": "" },
    },
    {
        label: "ENUMFUNCENDSWITH",
        kind: Function,
        nlsDetail: { "ja": "引数で終わる関数の総数を返す", "en": "" },
    },
    {
        label: "ENUMVARENDSWITH",
        kind: Function,
        nlsDetail: { "ja": "引数で終わる変数の総数を返す", "en": "" },
    },
    {
        label: "ENUMMACROENDSWITH",
        kind: Function,
        nlsDetail: { "ja": "引数で終わるマクロの総数を返す", "en": "" },
    },
    {
        label: "ENUMFUNCWITH",
        kind: Function,
        nlsDetail: { "ja": "引数を含む関数の総数を返す", "en": "" },
    },
    {
        label: "ENUMVARWITH",
        kind: Function,
        nlsDetail: { "ja": "引数を含む変数の総数を返す", "en": "" },
    },
    {
        label: "ENUMMACROWITH",
        kind: Function,
        nlsDetail: { "ja": "引数を含むマクロの総数を返す", "en": "" },
    },
    {
        label: "GETVAR",
        kind: Function,
        nlsDetail: { "ja": "FORM構文を用いて変数の値を取得する(数値型)", "en": "" },
    },
    {
        label: "GETVARS",
        kind: Function,
        nlsDetail: { "ja": "FORM構文を用いて変数の値を取得する(文字列型)", "en": "" },
    },
    {
        label: "SETVAR",
        kind: Function,
        nlsDetail: { "ja": "FORM構文を用いて変数に代入する", "en": "" },
    },
    {
        label: "VARSETEX",
        kind: Function,
        nlsDetail: { "ja": "FORM構文を用いてVARSETする", "en": "" },
    },
    {
        label: "ARRAYMSORTEX",
        kind: Function,
        nlsDetail: { "ja": "FORM構文を用いてARRAYMSORTする", "en": "" },
    },
    {
        label: "EXISTFUNCTION",
        kind: Function,
        nlsDetail: { "ja": "引数で指定した関数が存在するか確認する", "en": "" },
    },
    {
        label: "GDRAWTEXT",
        kind: Function,
        nlsDetail: { "ja": "指定のgIDにテキストを描写する", "en": "" },
    },
    {
        label: "GGETFONT",
        kind: Function,
        nlsDetail: { "ja": "指定したgIDの、GSETFONTで指定したフォント名を返す", "en": "" },
    },
    {
        label: "GGETFONTSIZE",
        kind: Function,
        nlsDetail: { "ja": "指定したgIDの、GSETFONTで指定したフォントサイズを返す", "en": "" },
    },
    {
        label: "GGETFONTSTYLE",
        kind: Function,
        nlsDetail: { "ja": "指定したgIDの、GSETFONTで指定したフォントスタイルを返す", "en": "" },
    },
    {
        label: "GGETTEXTSIZE",
        kind: Function,
        nlsDetail: { "ja": "同じ引数でGDRAWTEXTを行った場合のサイズを取得する", "en": "" },
    },
    {
        label: "GDRAWGWITHROTATE",
        kind: Function,
        nlsDetail: { "ja": "コピー元gIDのイメージを、指定した角度回転させてコピー先gIDに貼り付ける", "en": "" },
    },
    {
        label: "PLAYSOUND",
        kind: Function,
        nlsDetail: { "ja": "指定の音声ファイルを1回再生する", "en": "" },
    },
    {
        label: "PLAYBGM",
        kind: Function,
        nlsDetail: { "ja": "指定の音声ファイルをループ再生する", "en": "" },
    },
    {
        label: "EXISTSOUND",
        kind: Function,
        nlsDetail: { "ja": "指定の音声ファイルが存在するか確認する", "en": "" },
    },
    {
        label: "XML_DOCUMENT",
        kind: Function,
        nlsDetail: { "ja": "指定したIDにXmlDocumentを保存する", "en": "" },
    },
    {
        label: "XML_RELEASE",
        kind: Function,
        nlsDetail: { "ja": "指定したIDのXmlDocumentを削除する", "en": "" },
    },
    {
        label: "XML_EXIST",
        kind: Function,
        nlsDetail: { "ja": "指定したIDのXmlDocumentが存在するか確認する", "en": "" },
    },
    {
        label: "XML_GET",
        kind: Function,
        nlsDetail: { "ja": "指定したXmlからノードを選択し、結果数を返す", "en": "" },
    },
    {
        label: "XML_SET",
        kind: Function,
        nlsDetail: { "ja": "指定のXmlからノードを選択肢、引数を代入する", "en": "" },
    },
    {
        label: "XML_TOSTR",
        kind: Function,
        nlsDetail: { "ja": "指定したIDのXmlDocumentを文字列に変換して返す", "en": "" },
    },
    {
        label: "XML_ADDNODE",
        kind: Function,
        nlsDetail: { "ja": "指定のXmlにノードを追加する", "en": "" },
    },
    {
        label: "XML_REMOVENODE",
        kind: Function,
        nlsDetail: { "ja": "指定のXmlからノードを削除する", "en": "" },
    },
    {
        label: "XML_REPLACE",
        kind: Function,
        nlsDetail: { "ja": "指定したIDのXmlを置換する", "en": "" },
    },
    {
        label: "XML_ADDATTRIBUTE",
        kind: Function,
        nlsDetail: { "ja": "指定したXmlに属性を追加する", "en": "" },
    },
    {
        label: "XML_REMOVEATTRIBUTE",
        kind: Function,
        nlsDetail: { "ja": "指定したXmlから属性を削除する", "en": "" },
    },
    {
        label: "MAP_CREATE",
        kind: Function,
        nlsDetail: { "ja": "連想配列を作成する", "en": "" },
    },
    {
        label: "MAP_EXIST",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列が存在するか確認する", "en": "" },
    },
    {
        label: "MAP_RELEASE",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列を削除する", "en": "" },
    },
    {
        label: "MAP_GET",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列から、第二引数をキーとして値を取得する", "en": "" },
    },
    {
        label: "MAP_HAS",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列に、第二引数のキーが存在するか確認する", "en": "" },
    },
    {
        label: "MAP_SET",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列に、キーと値を代入する", "en": "" },
    },
    {
        label: "MAP_REMOVE",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列から、第二引数で指定したキーと値を削除する", "en": "" },
    },
    {
        label: "MAP_SIZE",
        kind: Function,
        nlsDetail: { "ja": "指定した連想配列の要素数を返す", "en": "" },
    },
    {
        label: "MAP_CLEAR",
        kind: Function,
        nlsDetail: { "ja": "指定した連想配列の要素を全て削除する", "en": "" },
    },
    {
        label: "MAP_GETKEYS",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列から複数の要素を同時に返す", "en": "" },
    },
    {
        label: "MAP_TOXML",
        kind: Function,
        nlsDetail: { "ja": "指定の連想配列をXML文字列に変換する", "en": "" },
    },
    {
        label: "MAP_FROMXML",
        kind: Function,
        nlsDetail: { "ja": "XML文字列から連想配列に変換して上書きする", "en": "" },
    },
    {
        label: "EXISTFILE",
        kind: Function,
        nlsDetail: { "ja": "Emueraを相対パスとして、指定したファイルが存在するか確認する", "en": "" },
    },
    {
        label: "GETMEMORYUSAGE",
        kind: Function,
        nlsDetail: { "ja": "現在起動中のEmueraのメモリ使用量を返す(byte)", "en": "" },
    },
    {
        label: "CLEARMEMORY",
        kind: Function,
        nlsDetail: { "ja": "Emueraで使用しているメモリを解放する 解放量を返す(byte)", "en": "" },
    },
	//#endregion
]);
