const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  const baseurl= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const dropdowns=document.querySelectorAll(".dropdown select")
  const btn=document.querySelector("form button")
  //const fromcurr=document.querySelector(".form select")
  const tocurr=document.querySelector(".too")
  const fromcurr=document.querySelector(".fromm")
  let msg=document.querySelector(".msg")
  for(let select of dropdowns){
    for(code in countryList){
        //console.log(code.toLowerCase())
        let newoption=document.createElement("option")
        newoption.innerText=code;
        newoption.value=code;
        select.append(newoption)
    if (select.name==="from" &&  code ==="USD"){
        newoption.selected="selected"
    }
    else if (select.name==="to" &&  code ==="INR"){
        newoption.selected="selected"
    }

    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)
    })
    btn.addEventListener("click",async (evt)=> {
        evt.preventDefault();
        let amount=document.querySelector(".amount input")
        let amtval=amount.value;
        console.log(amtval)
        if(amtval===""|| amtval<1){
            amtval=1
            amount.value="1";
        }
       const URL=`${baseurl}/${fromcurr.value.toLowerCase()}.json`
       let response=await fetch(URL);
       let data=await response.json();
       console.log(data)
       let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
        let finalamt=amtval*rate;
        console.log(finalamt)
        msg.innerText= `${amtval} ${fromcurr.value}=${finalamt} ${tocurr.value}`

        
    //    console.log(fromcurr.value.toLowerCase())
    //    console.log(tocurr.value.toLowerCase())
    //    let response= await fetch(URL)
    //    console.log(response)



    })
    
  }
 const updateFlag=(element)=>{
    let currcode=element.value
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc

 }


 