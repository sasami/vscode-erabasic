import * as vscode from "vscode";

import { CompletionItem, CompletionItemKind, Location, Position, TextDocument, Uri } from "vscode";
import { Declaration, DeclarationProvider, readDeclarations } from "./declaration";

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
    },
    {
        label: "DATAFORM",
        kind: Command,
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
    },
    {
        label: "RESETCOLOR",
        kind: Command,
    },
    {
        label: "SETBGCOLOR",
        kind: Command,
    },
    {
        label: "RESETBGCOLOR",
        kind: Command,
    },
    {
        label: "SETCOLORBYNAME",
        kind: Command,
    },
    {
        label: "SETBGCOLORBYNAME",
        kind: Command,
    },
    {
        label: "GETCOLOR",
        kind: Command,
    },
    {
        label: "GETDEFCOLOR",
        kind: Command,
    },
    {
        label: "GETBGCOLOR",
        kind: Command,
    },
    {
        label: "GETDEFBGCOLOR",
        kind: Command,
    },
    {
        label: "GETFOCUSCOLOR",
        kind: Command,
    },
    {
        label: "FONTBOLD",
        kind: Command,
    },
    {
        label: "FONTITALIC",
        kind: Command,
    },
    {
        label: "FONTREGULAR",
        kind: Command,
    },
    {
        label: "FONTSTYLE",
        kind: Command,
    },
    {
        label: "GETSTYLE",
        kind: Command,
    },
    {
        label: "CHKFONT",
        kind: Command,
    },
    {
        label: "SETFONT",
        kind: Command,
    },
    {
        label: "GETFONT",
        kind: Command,
    },
    {
        label: "FORCEKANA",
        kind: Command,
    },
    {
        label: "ALIGNMENT",
        kind: Command,
    },
    {
        label: "CURRENTALIGN",
        kind: Command,
    },
    {
        label: "REDRAW",
        kind: Command,
    },
    {
        label: "CURRENTREDRAW",
        kind: Command,
    },
    {
        label: "PRINTCPERLINE",
        kind: Command,
    },
    {
        label: "LINEISEMPTY",
        kind: Command,
    },
    {
        label: "BARSTR",
        kind: Command,
    },
    {
        label: "MONEYSTR",
        kind: Command,
    },
    {
        label: "SKIPDISP",
        kind: Command,
    },
    {
        label: "ISSKIP",
        kind: Command,
    },
    {
        label: "MOUSESKIP",
        kind: Command,
    },
    {
        label: "TOUPPER",
        kind: Command,
    },
    {
        label: "TOLOWER",
        kind: Command,
    },
    {
        label: "TOHALF",
        kind: Command,
    },
    {
        label: "TOFULL",
        kind: Command,
    },
    {
        label: "TOSTR",
        kind: Command,
    },
    {
        label: "ISNUMERIC",
        kind: Command,
    },
    {
        label: "TOINT",
        kind: Command,
    },
    {
        label: "STRLEN",
        kind: Command,
    },
    {
        label: "STRLENU",
        kind: Command,
    },
    {
        label: "STRLENS",
        kind: Command,
    },
    {
        label: "STRLENSU",
        kind: Command,
    },
    {
        label: "STRLENFORM",
        kind: Command,
    },
    {
        label: "STRLENFORMU",
        kind: Command,
    },
    {
        label: "SUBSTRING",
        kind: Command,
    },
    {
        label: "SUBSTRINGU",
        kind: Command,
    },
    {
        label: "CHARATU",
        kind: Command,
    },
    {
        label: "STRFIND",
        kind: Command,
    },
    {
        label: "STRFINDU",
        kind: Command,
    },
    {
        label: "STRCOUNT",
        kind: Command,
    },
    {
        label: "SPLIT",
        kind: Command,
    },
    {
        label: "REPLACE",
        kind: Command,
    },
    {
        label: "ESCAPE",
        kind: Command,
    },
    {
        label: "UNICODE",
        kind: Command,
    },
    {
        label: "ENCODETOUNI",
        kind: Command,
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

export class CompletionItemRepository {
    private cache: Map<string, NLSCompletionItem[]> = new Map();

    constructor(private provider: DeclarationProvider) {
        provider.onDidChange((e) => {
            this.cache.set(e.uri.fsPath, e.decls.filter((d) => d.isGlobal)
                .map((d) => declToCompletionItem(d)));
        });
        provider.onDidDelete((e) => {
            this.cache.delete(e.uri.fsPath);
        });
        provider.onDidReset((e) => {
            this.cache.clear();
        });
    }

    public sync(): Promise<void> {
        return this.provider.sync();
    }

    public *find(document: TextDocument, position: Position): IterableIterator<NLSCompletionItem> {
        yield* this.findInCurrentDocument(document, position);
        const ws = vscode.workspace.getWorkspaceFolder(document.uri);
        if (ws === undefined) {
            return;
        }
        const fresh: Set<string> = new Set([document.uri.fsPath]);
        for (const doc of vscode.workspace.textDocuments) {
            // BuiltinDeclarationFiles と BuiltinComplationItems で多重定義になってるからどっちか切りたい
            if (!doc.isDirty) {
                continue;
            }
            if (doc === document) {
                continue;
            }
            if (!this.cache.has(doc.uri.fsPath)) {
                continue;
            }
            if (!this.provider.reachable(ws, doc.uri.fsPath)) {
                continue;
            }
            fresh.add(doc.uri.fsPath);
            yield* this.findInDocument(doc);
        }
        for (const [path, defs] of this.cache.entries()) {
            if (fresh.has(path)) {
                continue;
            }
            if (!this.provider.reachable(ws, path)) {
                continue;
            }
            yield* defs.filter((d) => d).map((d) => d);
        }
    }

    private findInCurrentDocument(document: TextDocument, position: Position): NLSCompletionItem[] {
        return readDeclarations(document.getText())
            .filter((d) => d.visible(position))
            .map((d) => declToCompletionItem(d));
    }

    private findInDocument(document: TextDocument): NLSCompletionItem[] {
        return readDeclarations(document.getText())
            .filter((d) => d.isGlobal)
            .map((d) => declToCompletionItem(d));
    }
}

export function declToCompletionItem(decreation: Declaration): NLSCompletionItem {
    const symbolKind = decreation.kind;
    let kind: vscode.CompletionItemKind = toCompletionItemKind(symbolKind);

    return {
        label: decreation.name,
        kind: kind,
        // TODO 関数の引数情報がほしい
        detail: `(${getName(kind)}) ${decreation.name}`,
    };
}

function getName(kind: vscode.CompletionItemKind) {
    return vscode.CompletionItemKind[kind];
}

function toCompletionItemKind(symbolKind: vscode.SymbolKind):vscode.CompletionItemKind {
    switch (symbolKind) {
        case vscode.SymbolKind.Variable:
            return vscode.CompletionItemKind.Variable;
        case vscode.SymbolKind.Function:
            return vscode.CompletionItemKind.Function;
        default:
            return undefined;
    }
}
