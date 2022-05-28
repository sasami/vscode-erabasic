import { CompletionItem, CompletionItemKind } from "vscode";
import { LocalizeUD } from "./localize";

const Keyword = CompletionItemKind.Keyword;
const Control = CompletionItemKind.Keyword;
const Command = CompletionItemKind.Function;   // 命令と呼ばれてるもののうち、関数では無いもの
const Function = CompletionItemKind.Function;  // 関数と呼ばれてるもの (Emueraの仕様上、全ての式中関数は命令としても機能する)
const Variable = CompletionItemKind.Variable;


function localizedComplationItems(items: CompletionItem[]): CompletionItem[] {
    return items.map((item) => {
        if (item.detail === undefined) {
            item.detail = LocalizeUD("completion.build-in." + item.label);
        }
        return item;
    });
}

// PRINT系を埋めて力尽きただけなので、気の向くまま埋めちゃって下されば取り込みます。
// もちろん、日本語だけ、英語だけ、detailなんか無くてもOK！
export const GetBuiltinComplationItems = () => {
    return localizedComplationItems([
        {
            label: "PRINT",
            kind: Command,
        },
        {
            label: "PRINTL",
            kind: Command,
        },
        {
            label: "PRINTW",
            kind: Command,
        },
        {
            label: "PRINTK",
            kind: Command,
        },
        {
            label: "PRINTKL",
            kind: Command,
        },
        {
            label: "PRINTKW",
            kind: Command,
        },
        {
            label: "PRINTD",
            kind: Command,
        },
        {
            label: "PRINTDL",
            kind: Command,
        },
        {
            label: "PRINTDW",
            kind: Command,
        },
        {
            label: "PRINTV",
            kind: Command,
        },
        {
            label: "PRINTVL",
            kind: Command,
        },
        {
            label: "PRINTVW",
            kind: Command,
        },
        {
            label: "PRINTVK",
            kind: Command,
        },
        {
            label: "PRINTVKL",
            kind: Command,
        },
        {
            label: "PRINTVKW",
            kind: Command,
        },
        {
            label: "PRINTVD",
            kind: Command,
        },
        {
            label: "PRINTVDL",
            kind: Command,
        },
        {
            label: "PRINTVDW",
            kind: Command,
        },
        {
            label: "PRINTS",
            kind: Command,
        },
        {
            label: "PRINTSL",
            kind: Command,
        },
        {
            label: "PRINTSW",
            kind: Command,
        },
        {
            label: "PRINTSK",
            kind: Command,
        },
        {
            label: "PRINTSKL",
            kind: Command,
        },
        {
            label: "PRINTSKW",
            kind: Command,
        },
        {
            label: "PRINTSD",
            kind: Command,
        },
        {
            label: "PRINTSDL",
            kind: Command,
        },
        {
            label: "PRINTSDW",
            kind: Command,
        },
        {
            label: "PRINTFORM",
            kind: Command,
        },
        {
            label: "PRINTFORML",
            kind: Command,
        },
        {
            label: "PRINTFORMW",
            kind: Command,
        },
        {
            label: "PRINTFORMK",
            kind: Command,
        },
        {
            label: "PRINTFORMKL",
            kind: Command,
        },
        {
            label: "PRINTFORMKW",
            kind: Command,
        },
        {
            label: "PRINTFORMD",
            kind: Command,
        },
        {
            label: "PRINTFORMDL",
            kind: Command,
        },
        {
            label: "PRINTFORMDW",
            kind: Command,
        },
        {
            label: "PRINTFORMS",
            kind: Command,
        },
        {
            label: "PRINTFORMSL",
            kind: Command,
        },
        {
            label: "PRINTFORMSW",
            kind: Command,
        },
        {
            label: "PRINTFORMSK",
            kind: Command,
        },
        {
            label: "PRINTFORMSKL",
            kind: Command,
        },
        {
            label: "PRINTFORMSKW",
            kind: Command,
        },
        {
            label: "PRINTFORMSD",
            kind: Command,
        },
        {
            label: "PRINTFORMSDL",
            kind: Command,
        },
        {
            label: "PRINTFORMSDW",
            kind: Command,
        },
        {
            label: "PRINTSINGLE",
            kind: Command,
        },
        {
            label: "PRINTSINGLEK",
            kind: Command,
        },
        {
            label: "PRINTSINGLED",
            kind: Command,
        },
        {
            label: "PRINTSINGLEV",
            kind: Command,
        },
        {
            label: "PRINTSINGLEVK",
            kind: Command,
        },
        {
            label: "PRINTSINGLEVD",
            kind: Command,
        },
        {
            label: "PRINTSINGLES",
            kind: Command,
        },
        {
            label: "PRINTSINGLESK",
            kind: Command,
        },
        {
            label: "PRINTSINGLESD",
            kind: Command,
        },
        {
            label: "PRINTSINGLEFORM",
            kind: Command,
        },
        {
            label: "PRINTSINGLEFORMK",
            kind: Command,
        },
        {
            label: "PRINTSINGLEFORMD",
            kind: Command,
        },
        {
            label: "PRINTSINGLEFORMS",
            kind: Command,
        },
        {
            label: "PRINTSINGLEFORMSK",
            kind: Command,
        },
        {
            label: "PRINTSINGLEFORMSD",
            kind: Command,
        },
        {
            label: "PRINTC",
            kind: Command,
        },
        {
            label: "PRINTCK",
            kind: Command,
        },
        {
            label: "PRINTCD",
            kind: Command,
        },
        {
            label: "PRINTLC",
            kind: Command,
        },
        {
            label: "PRINTLCK",
            kind: Command,
        },
        {
            label: "PRINTLCD",
            kind: Command,
        },
        {
            label: "PRINTFORMC",
            kind: Command,
        },
        {
            label: "PRINTFORMCK",
            kind: Command,
        },
        {
            label: "PRINTFORMCD",
            kind: Command,
        },
        {
            label: "PRINTFORMLC",
            kind: Command,
        },
        {
            label: "PRINTFORMLCK",
            kind: Command,
        },
        {
            label: "PRINTFORMLCD",
            kind: Command,
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
        },
        {
            label: "PRINTBUTTONC",
            kind: Command,
        },
        {
            label: "PRINTBUTTONLC",
            kind: Command,
        },
        {
            label: "PRINTPLAIN",
            kind: Command,
        },
        {
            label: "PRINTPLAINFORM",
            kind: Command,
        },
        {
            label: "CUSTOMDRAWLINE",
            kind: Command,
        },
        {
            label: "DRAWLINEFORM",
            kind: Command,
        },
        {
            label: "REUSELASTLINE",
            kind: Command,
        },
        {
            label: "PRINT_ABL",
            kind: Command,
        },
        {
            label: "PRINT_TALENT",
            kind: Command,
        },
        {
            label: "PRINT_MARK",
            kind: Command,
        },
        {
            label: "PRINT_EXP",
            kind: Command,
        },
        {
            label: "PRINT_PALAM",
            kind: Command,
        },
        {
            label: "PRINT_ITEM",
            kind: Command,
        },
        {
            label: "PRINT_SHOPITEM",
            kind: Command,
        },
        {
            label: "UPCHECK",
            kind: Command,
        },
        {
            label: "DRAWLINE",
            kind: Command,
        },
        {
            label: "CLEARLINE",
            kind: Command,
        },
        {
            label: "PRINT_IMG",
            kind: Command,
        },
        {
            label: "PRINT_RECT",
            kind: Command,
        },
        {
            label: "PRINT_SPACE",
            kind: Command,
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
            insertText: "DIM",
        },
        {
            label: "#DIMS",
            kind: Keyword,
            insertText: "DIMS",
        },
        {
            label: "#SINGLE",
            kind: Keyword,
            insertText: "SINGLE",
        },
        {
            label: "#PRI",
            kind: Keyword,
            insertText: "PRI",
        },
        {
            label: "#LATER",
            kind: Keyword,
            insertText: "LATER",
        },
        {
            label: "#ONLY",
            kind: Keyword,
            insertText: "ONLY",
        },
        {
            label: "#FUNCTION",
            kind: Keyword,
            insertText: "FUNCTION",
        },
        {
            label: "#FUNCTIONS",
            kind: Keyword,
            insertText: "FUNCTIONS",
        },
        {
            label: "#LOCALSIZE",
            kind: Keyword,
            insertText: "LOCALSIZE",
        },
        {
            label: "#LOCALSSIZE",
            kind: Keyword,
            insertText: "LOCALSSIZE",
        },
        {
            label: "#DEFINE",
            kind: Keyword,
            insertText: "DEFINE",
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
        },
        {
            label: "FORCE_QUIT",
            kind: Command,
        },
        {
            label: "FORCE_QUIT_AND_RESTART",
            kind: Command,
        },
        {
            label: "FORCE_BEGIN",
            kind: Command,
        },
        {
            label: "STOPSOUND",
            kind: Command,
        },
        {
            label: "STOPBGM",
            kind: Command,
        },
        {
            label: "SETSOUNDVOLUME",
            kind: Command,
        },
        {
            label: "SETBGMVOLUME",
            kind: Command,
        },
        {
            label: "UPDATECHECK",
            kind: Command,
        },
        {
            label: "TRYCALLF",
            kind: Command,
        },
        {
            label: "TRYCALLFORMF",
            kind: Command,
        },
        {
            label: "HTML_STRINGLEN",
            kind: Function,
        },
        {
            label: "HTML_SUBSTRING",
            kind: Function,
        },
        {
            label: "REGEXPMATCH",
            kind: Function,
        },
        {
            label: "ISDEFINED",
            kind: Function,
        },
        {
            label: "EXISTVAR",
            kind: Function,
        },
        {
            label: "ENUMFUNCBEGINSWITH",
            kind: Function,
        },
        {
            label: "ENUMVARBEGINSWITH",
            kind: Function,
        },
        {
            label: "ENUMMACROBEGINSWITH",
            kind: Function,
        },
        {
            label: "ENUMFUNCENDSWITH",
            kind: Function,
        },
        {
            label: "ENUMVARENDSWITH",
            kind: Function,
        },
        {
            label: "ENUMMACROENDSWITH",
            kind: Function,
        },
        {
            label: "ENUMFUNCWITH",
            kind: Function,
        },
        {
            label: "ENUMVARWITH",
            kind: Function,
        },
        {
            label: "ENUMMACROWITH",
            kind: Function,
        },
        {
            label: "GETVAR",
            kind: Function,
        },
        {
            label: "GETVARS",
            kind: Function,
        },
        {
            label: "SETVAR",
            kind: Function,
        },
        {
            label: "VARSETEX",
            kind: Function,
        },
        {
            label: "ARRAYMSORTEX",
            kind: Function,
        },
        {
            label: "EXISTFUNCTION",
            kind: Function,
        },
        {
            label: "GDRAWTEXT",
            kind: Function,
        },
        {
            label: "GGETFONT",
            kind: Function,
        },
        {
            label: "GGETFONTSIZE",
            kind: Function,
        },
        {
            label: "GGETFONTSTYLE",
            kind: Function,
        },
        {
            label: "GGETTEXTSIZE",
            kind: Function,
        },
        {
            label: "GDRAWGWITHROTATE",
            kind: Function,
        },
        {
            label: "PLAYSOUND",
            kind: Function,
        },
        {
            label: "PLAYBGM",
            kind: Function,
        },
        {
            label: "EXISTSOUND",
            kind: Function,
        },
        {
            label: "XML_DOCUMENT",
            kind: Function,
        },
        {
            label: "XML_RELEASE",
            kind: Function,
        },
        {
            label: "XML_EXIST",
            kind: Function,
        },
        {
            label: "XML_GET",
            kind: Function,
        },
        {
            label: "XML_SET",
            kind: Function,
        },
        {
            label: "XML_TOSTR",
            kind: Function,
        },
        {
            label: "XML_ADDNODE",
            kind: Function,
        },
        {
            label: "XML_REMOVENODE",
            kind: Function,
        },
        {
            label: "XML_REPLACE",
            kind: Function,
        },
        {
            label: "XML_ADDATTRIBUTE",
            kind: Function,
        },
        {
            label: "XML_REMOVEATTRIBUTE",
            kind: Function,
        },
        {
            label: "MAP_CREATE",
            kind: Function,
        },
        {
            label: "MAP_EXIST",
            kind: Function,
        },
        {
            label: "MAP_RELEASE",
            kind: Function,
        },
        {
            label: "MAP_GET",
            kind: Function,
        },
        {
            label: "MAP_HAS",
            kind: Function,
        },
        {
            label: "MAP_SET",
            kind: Function,
        },
        {
            label: "MAP_REMOVE",
            kind: Function,
        },
        {
            label: "MAP_SIZE",
            kind: Function,
        },
        {
            label: "MAP_CLEAR",
            kind: Function,
        },
        {
            label: "MAP_GETKEYS",
            kind: Function,
        },
        {
            label: "MAP_TOXML",
            kind: Function,
        },
        {
            label: "MAP_FROMXML",
            kind: Function,
        },
        {
            label: "EXISTFILE",
            kind: Function,
        },
        {
            label: "GETMEMORYUSAGE",
            kind: Function,
        },
        {
            label: "CLEARMEMORY",
            kind: Function,
        },
        //#endregion
    ]);
}