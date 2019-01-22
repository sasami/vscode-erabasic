import { CompletionItem, CompletionItemKind } from "vscode";

const Keyword = CompletionItemKind.Keyword;
const Control = CompletionItemKind.Keyword;
const Command = CompletionItemKind.Function;
const Function = CompletionItemKind.Function;
const Variable = CompletionItemKind.Variable;

export const BuiltinComplationItems: CompletionItem[] = [
    {
        label: "PRINT",
        kind: Command,
        detail: "文字列を表示",
    },
    {
        label: "PRINTL",
        kind: Command,
        detail: "文字列を表示+改行",
    },
    {
        label: "PRINTW",
        kind: Command,
        detail: "文字列を表示+待機",
    },
    {
        label: "PRINTK",
        kind: Command,
        detail: "文字列を表示+カナ強制",
    },
    {
        label: "PRINTKL",
        kind: Command,
        detail: "文字列を表示+カナ強制+改行",
    },
    {
        label: "PRINTKW",
        kind: Command,
        detail: "文字列を表示+カナ強制+待機",
    },
    {
        label: "PRINTD",
        kind: Command,
        detail: "文字列を表示+初期色",
    },
    {
        label: "PRINTDL",
        kind: Command,
        detail: "文字列を表示+初期色+改行",
    },
    {
        label: "PRINTDW",
        kind: Command,
        detail: "文字列を表示+初期色+待機",
    },
    {
        label: "PRINTV",
        kind: Command,
        detail: "数式を表示",
    },
    {
        label: "PRINTVL",
        kind: Command,
        detail: "数式を表示+改行",
    },
    {
        label: "PRINTVW",
        kind: Command,
        detail: "数式を表示+待機",
    },
    {
        label: "PRINTVK",
        kind: Command,
        detail: "数式を表示+カナ強制",
    },
    {
        label: "PRINTVKL",
        kind: Command,
        detail: "数式を表示+カナ強制+改行",
    },
    {
        label: "PRINTVKW",
        kind: Command,
        detail: "数式を表示+カナ強制+待機",
    },
    {
        label: "PRINTVD",
        kind: Command,
        detail: "数式を表示+初期色",
    },
    {
        label: "PRINTVDL",
        kind: Command,
        detail: "数式を表示+初期色+改行",
    },
    {
        label: "PRINTVDW",
        kind: Command,
        detail: "数式を表示+初期色+待機",
    },
    {
        label: "PRINTS",
        kind: Command,
        detail: "文字列式を表示",
    },
    {
        label: "PRINTSL",
        kind: Command,
        detail: "文字列式を表示+改行",
    },
    {
        label: "PRINTSW",
        kind: Command,
        detail: "文字列式を表示+待機",
    },
    {
        label: "PRINTSK",
        kind: Command,
        detail: "文字列式を表示+カナ強制",
    },
    {
        label: "PRINTSKL",
        kind: Command,
        detail: "文字列式を表示+カナ強制+改行",
    },
    {
        label: "PRINTSKW",
        kind: Command,
        detail: "文字列式を表示+カナ強制+待機",
    },
    {
        label: "PRINTSD",
        kind: Command,
        detail: "文字列式を表示+初期色",
    },
    {
        label: "PRINTSDL",
        kind: Command,
        detail: "文字列式を表示+初期色+改行",
    },
    {
        label: "PRINTSDW",
        kind: Command,
        detail: "文字列式を表示+初期色+待機",
    },
    {
        label: "PRINTFORM",
        kind: Command,
        detail: "書式付文字列を表示",
    },
    {
        label: "PRINTFORML",
        kind: Command,
        detail: "書式付文字列を表示+改行",
    },
    {
        label: "PRINTFORMW",
        kind: Command,
        detail: "書式付文字列を表示+待機",
    },
    {
        label: "PRINTFORMK",
        kind: Command,
        detail: "書式付文字列を表示+カナ強制",
    },
    {
        label: "PRINTFORMKL",
        kind: Command,
        detail: "書式付文字列を表示+カナ強制+改行",
    },
    {
        label: "PRINTFORMKW",
        kind: Command,
        detail: "書式付文字列を表示+カナ強制+待機",
    },
    {
        label: "PRINTFORMD",
        kind: Command,
        detail: "書式付文字列を表示+初期色",
    },
    {
        label: "PRINTFORMDL",
        kind: Command,
        detail: "書式付文字列を表示+初期色+改行",
    },
    {
        label: "PRINTFORMDW",
        kind: Command,
        detail: "書式付文字列を表示+初期色+待機",
    },
    {
        label: "PRINTFORMS",
        kind: Command,
        detail: "書式付文字列式を表示",
    },
    {
        label: "PRINTFORMSL",
        kind: Command,
        detail: "書式付文字列式を表示+改行",
    },
    {
        label: "PRINTFORMSW",
        kind: Command,
        detail: "書式付文字列式を表示+待機",
    },
    {
        label: "PRINTFORMSK",
        kind: Command,
        detail: "書式付文字列式を表示+カナ強制",
    },
    {
        label: "PRINTFORMSKL",
        kind: Command,
        detail: "書式付文字列式を表示+カナ強制+改行",
    },
    {
        label: "PRINTFORMSKW",
        kind: Command,
        detail: "書式付文字列式を表示+カナ強制+待機",
    },
    {
        label: "PRINTFORMSD",
        kind: Command,
        detail: "書式付文字列式を表示+初期色",
    },
    {
        label: "PRINTFORMSDL",
        kind: Command,
        detail: "書式付文字列式を表示+初期色+改行",
    },
    {
        label: "PRINTFORMSDW",
        kind: Command,
        detail: "書式付文字列式を表示+初期色+待機",
    },
    {
        label: "PRINTSINGLE",
        kind: Command,
        detail: "文字列を表示",
    },
    {
        label: "PRINTSINGLEK",
        kind: Command,
        detail: "文字列を表示+カナ強制",
    },
    {
        label: "PRINTSINGLED",
        kind: Command,
        detail: "文字列を表示+初期色",
    },
    {
        label: "PRINTSINGLEV",
        kind: Command,
        detail: "数式を表示",
    },
    {
        label: "PRINTSINGLEVK",
        kind: Command,
        detail: "数式を表示+カナ強制",
    },
    {
        label: "PRINTSINGLEVD",
        kind: Command,
        detail: "数式を表示+初期色",
    },
    {
        label: "PRINTSINGLES",
        kind: Command,
        detail: "文字列式を表示",
    },
    {
        label: "PRINTSINGLESK",
        kind: Command,
        detail: "文字列式を表示+カナ強制",
    },
    {
        label: "PRINTSINGLESD",
        kind: Command,
        detail: "文字列式を表示+初期色",
    },
    {
        label: "PRINTSINGLEFORM",
        kind: Command,
        detail: "書式付文字列を表示",
    },
    {
        label: "PRINTSINGLEFORMK",
        kind: Command,
        detail: "書式付文字列を表示+カナ強制",
    },
    {
        label: "PRINTSINGLEFORMD",
        kind: Command,
        detail: "書式付文字列を表示+初期色",
    },
    {
        label: "PRINTSINGLEFORMS",
        kind: Command,
        detail: "書式付文字列式を表示",
    },
    {
        label: "PRINTSINGLEFORMSK",
        kind: Command,
        detail: "書式付文字列式を表示+カナ強制",
    },
    {
        label: "PRINTSINGLEFORMSD",
        kind: Command,
        detail: "書式付文字列式を表示+初期色",
    },
    {
        label: "PRINTC",
        kind: Command,
        detail: "文字列を表示+右揃え",
    },
    {
        label: "PRINTCK",
        kind: Command,
        detail: "文字列を表示+右揃え+カナ強制",
    },
    {
        label: "PRINTCD",
        kind: Command,
        detail: "文字列を表示+右揃え+初期色",
    },
    {
        label: "PRINTLC",
        kind: Command,
        detail: "文字列を表示+左揃え",
    },
    {
        label: "PRINTLCK",
        kind: Command,
        detail: "文字列を表示+左揃え+カナ強制",
    },
    {
        label: "PRINTLCD",
        kind: Command,
        detail: "文字列を表示+左揃え+初期色",
    },
    {
        label: "PRINTFORMC",
        kind: Command,
        detail: "書式付文字列を表示+右揃え",
    },
    {
        label: "PRINTFORMCK",
        kind: Command,
        detail: "書式付文字列を表示+右揃え+カナ強制",
    },
    {
        label: "PRINTFORMCD",
        kind: Command,
        detail: "書式付文字列を表示+右揃え+初期色",
    },
    {
        label: "PRINTFORMLC",
        kind: Command,
        detail: "書式付文字列を表示+左揃え",
    },
    {
        label: "PRINTFORMLCK",
        kind: Command,
        detail: "書式付文字列を表示+左揃え+カナ強制",
    },
    {
        label: "PRINTFORMLCD",
        kind: Command,
        detail: "書式付文字列を表示+左揃え+初期色",
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
        detail: "ボタンを表示",
    },
    {
        label: "PRINTBUTTONC",
        kind: Command,
        detail: "ボタンを表示+右揃え",
    },
    {
        label: "PRINTBUTTONLC",
        kind: Command,
        detail: "ボタンを表示+左揃え",
    },
    {
        label: "PRINTPLAIN",
        kind: Command,
        detail: "文字列を表示",
    },
    {
        label: "PRINTPLAINFORM",
        kind: Command,
        detail: "書式付文字列を表示",
    },
    {
        label: "CUSTOMDRAWLINE",
        kind: Command,
        detail: "横先を表示",
    },
    {
        label: "DRAWLINEFORM",
        kind: Command,
        detail: "横先を表示",
    },
    {
        label: "REUSELASTLINE",
        kind: Command,
        detail: "最終行を書き換え",
    },
    {
        label: "PRINT_ABL",
        kind: Command,
        detail: "キャラの能力を表示",
    },
    {
        label: "PRINT_TALENT",
        kind: Command,
        detail: "キャラの素質を表示",
    },
    {
        label: "PRINT_MARK",
        kind: Command,
        detail: "キャラの刻印を表示",
    },
    {
        label: "PRINT_EXP",
        kind: Command,
        detail: "キャラの経験を表示",
    },
    {
        label: "PRINT_PALAM",
        kind: Command,
        detail: "キャラの調教中パラメータを表示",
    },
    {
        label: "PRINT_ITEM",
        kind: Command,
        detail: "所持アイテムを表示",
    },
    {
        label: "PRINT_SHOPITEM",
        kind: Command,
        detail: "販売アイテムを表示",
    },
    {
        label: "UPCHECK",
        kind: Command,
        detail: "調教中パラメータの変化を表示",
    },
    {
        label: "DRAWLINE",
        kind: Command,
        detail: "横先を表示",
    },
    {
        label: "CLEARLINE",
        kind: Command,
        detail: "行を削除",
    },
    {
        label: "PRINT_IMG",
        kind: Command,
        detail: "画像を表示",
    },
    {
        label: "PRINT_RECT",
        kind: Command,
        detail: "矩形を表示",
    },
    {
        label: "PRINT_SPACE",
        kind: Command,
        detail: "空白を表示",
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
        kind: Command,
    },
    {
        label: "GETKEY",
        kind: Command,
    },
    {
        label: "GETKEYTRIGGERD",
        kind: Command,
    },
    {
        label: "MOUSEX",
        kind: Command,
    },
    {
        label: "MOUSEY",
        kind: Command,
    },
    {
        label: "ISACTIVE",
        kind: Command,
    },
    {
        label: "SAVETEXT",
        kind: Command,
    },
    {
        label: "LOADTEXT",
        kind: Command,
    },
    {
        label: "SPRITECREATED",
        kind: Command,
    },
    {
        label: "SPRITEWIDTH",
        kind: Command,
    },
    {
        label: "SPRITEHEIGHT",
        kind: Command,
    },
    {
        label: "SPRITEPOSX",
        kind: Command,
    },
    {
        label: "SPRITEPOSY",
        kind: Command,
    },
    {
        label: "SPRITESETPOS",
        kind: Command,
    },
    {
        label: "SPRITEMOVE",
        kind: Command,
    },
    {
        label: "ARRAYMSORT",
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
];
