"use client";
import { useState, useMemo, useEffect } from "react";

const ALL_INTERESTS = [
  "Coffee dates","BJs","Raw BJs","Art","Music","Dancing","Raw BJ",
  "Photography","3 Somes","Gym","Movies","Fashion","Beach","Yoga",
  "Wine tasting","COB — Cum On Bodyz","Outdoors","CIM — Cum In Mouth","Brunch","Nature",
  "Baking","COB — Cum On Body","Painting","Reading","Lesbian Shows","Pilates",
  "Road trips","Lesbian Show","Anal","COB — Cum On Bodys","Fitness","Running",
];

// Two numbers that rotate per profile
const NUMBERS = ["0738442380","0799426335"];
const getNumber = (imgNum: number): string =>
  NUMBERS[imgNum % 2];
const PROFILES_RAW = [
  { id:"nai001", name:"Abby", age:31, county:"Nairobi", town:"Westlands", tags:["sex","Raw BJ"], interests:[25,9,21,19], height:`5'2"`, lookingFor:"  something Real", isNew:false, verified:false, bisexual:false, imgNum:1 },
  { id:"nai002", name:"Zoe", age:32, county:"Nairobi", town:"Kilimani", tags:["sex","Raw BJ"], interests:[15,28,5,23], height:`5'7"`, lookingFor:"  RealSex", isNew:true, verified:false, bisexual:false, imgNum:2 },
  { id:"nai003", name:"Felicia", age:32, county:"Nairobi", town:"Karen", tags:["sex","Raw BJ"], interests:[6,30,15,2], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:3 },
  { id:"nai004", name:"Grace", age:20, county:"Nairobi", town:"Lavington", tags:["sex","Raw BJ"], interests:[8,24,10,3], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:4 },
  { id:"nai005", name:"Sarah", age:20, county:"Nairobi", town:"South B", tags:["sex","Raw BJ"], interests:[26,20,14,25], height:`5'8"`, lookingFor:" RealSex", isNew:false, verified:true, bisexual:false, imgNum:5 },
  { id:"nai006", name:"Lea", age:25, county:"Nairobi", town:"Kasarani", tags:["sex","Raw BJ"], interests:[2,18,3,9], height:`5'6"`, lookingFor:"Fun & Hookup", isNew:false, verified:true, bisexual:false, imgNum:6 },
  { id:"nai007", name:"Mariamu", age:26, county:"Nairobi", town:"Ruaraka", tags:["sex","Raw BJ"], interests:[26,3,24,29], height:`5'10"`, lookingFor:"Calm & present partner", isNew:false, verified:false, bisexual:false, imgNum:7 },
  { id:"nai008", name:"Christine", age:22, county:"Nairobi", town:"Zimmerman", tags:["sex","Raw BJ"], interests:[12,4,28,3], height:`5'9"`, lookingFor:"Calm & present partner", isNew:false, verified:false, bisexual:false, imgNum:8 },
  { id:"nai009", name:"Aisha", age:33, county:"Nairobi", town:"Uthiru", tags:["sex","Raw BJ"], interests:[9,4,31,27], height:`5'6"`, lookingFor:"Something real", isNew:true, verified:true, bisexual:false, imgNum:9 },
  { id:"nai010", name:"Abigail", age:28, county:"Nairobi", town:"Kinoo", tags:["sex","Raw BJ"], interests:[25,23,22,30], height:`5'4"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:true, imgNum:10 },
  { id:"nai011", name:"Alice", age:33, county:"Nairobi", town:"Langata", tags:["sex","Raw BJ"], interests:[30,2,13,28], height:`5'7"`, lookingFor:"Calm & present partner", isNew:false, verified:true, bisexual:false, imgNum:11 },
  { id:"nai012", name:"Wanjira", age:32, county:"Nairobi", town:"CBD", tags:["sex","Raw BJ"], interests:[31,9,11,3], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:12 },
  { id:"nai013", name:"Martha", age:22, county:"Nairobi", town:"Pipeline", tags:["sex","Raw BJ"], interests:[22,24,2,7], height:`5'9"`, lookingFor:"Serious relationship", isNew:false, verified:true, bisexual:false, imgNum:13 },
  { id:"nai014", name:"Margaret", age:29, county:"Nairobi", town:"Eastleigh", tags:["sex","Raw BJ"], interests:[7,22,23,5], height:`5'2"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:14 },
  { id:"nai015", name:"Amani", age:30, county:"Nairobi", town:"Embakasi", tags:["sex","Raw BJ"], interests:[11,21,2,9], height:`5'9"`, lookingFor:"Life partner", isNew:true, verified:false, bisexual:false, imgNum:15 },
  { id:"nai016", name:"Eunice", age:20, county:"Nairobi", town:"Roysambu", tags:["sex","Raw BJ"], interests:[20,1,28,29], height:`5'6"`, lookingFor:"Long-term partner", isNew:true, verified:false, bisexual:false, imgNum:16 },
  { id:"nai017", name:"Yvette", age:22, county:"Nairobi", town:"Githurai", tags:["sex","Raw BJ"], interests:[9,7,12,11], height:`5'9"`, lookingFor:"Something real", isNew:true, verified:true, bisexual:false, imgNum:17 },
  { id:"nai018", name:"Amy", age:29, county:"Nairobi", town:"Kahawa", tags:["sex","Raw BJ"], interests:[28,15,1,7], height:`5'6"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:18 },
  { id:"nai019", name:"Akoth", age:30, county:"Nairobi", town:"Njiru", tags:["sex","Raw BJ"], interests:[22,7,26,20], height:`5'8"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:19 },
  { id:"nai020", name:"Luci", age:21, county:"Nairobi", town:"Umoja", tags:["sex","Raw BJ"], interests:[31,13,30,27], height:`5'8"`, lookingFor:"Fun & Hookup", isNew:false, verified:false, bisexual:false, imgNum:20 },
  { id:"nai021", name:"Betty", age:34, county:"Nairobi", town:"Donholm", tags:["sex","Raw BJ"], interests:[28,3,25,22], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:21 },
  { id:"nai022", name:"Perpetua", age:30, county:"Nairobi", town:"Buruburu", tags:["sex","Raw BJ"], interests:[13,26,11,18], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:true, imgNum:22 },
  { id:"nai023", name:"Cherotich", age:24, county:"Nairobi", town:"Gigiri", tags:["sex","Raw BJ"], interests:[22,17,31,13], height:`5'9"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:false, imgNum:23 },
  { id:"nai024", name:"Pia", age:29, county:"Nairobi", town:"Runda", tags:["sex","Raw BJ"], interests:[6,3,25,10], height:`5'3"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:24 },
  { id:"nai025", name:"Una", age:28, county:"Nairobi", town:"Upperhill", tags:["sex","Raw BJ"], interests:[6,17,28,25], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:25 },
  { id:"nai026", name:"Luna", age:30, county:"Nairobi", town:"Parklands", tags:["sex","Raw BJ"], interests:[25,16,0,9], height:`5'9"`, lookingFor:"Serious relationship", isNew:false, verified:true, bisexual:false, imgNum:26 },
  { id:"nai027", name:"Faith", age:31, county:"Nairobi", town:"Ngara", tags:["sex","Raw BJ"], interests:[1,28,0,12], height:`5'9"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:27 },
  { id:"nai028", name:"Phoebe", age:34, county:"Nairobi", town:"Makongeni", tags:["sex","Raw BJ"], interests:[7,15,21,24], height:`5'6"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:28 },
  { id:"nai029", name:"Naserian", age:32, county:"Nairobi", town:"Mihango", tags:["sex","Raw BJ"], interests:[17,11,0,12], height:`5'4"`, lookingFor:"Calm & present partner", isNew:true, verified:false, bisexual:false, imgNum:29 },
  { id:"nai030", name:"Carolyn", age:31, county:"Nairobi", town:"Kariobangi", tags:["sex","Raw BJ"], interests:[27,23,24,16], height:`5'2"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:true, imgNum:30 },
  { id:"nai031", name:"Teresa", age:28, county:"Nairobi", town:"Westlands", tags:["sex","Raw BJ"], interests:[11,1,25,9], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:31 },
  { id:"nai032", name:"Tabitha", age:20, county:"Nairobi", town:"Kilimani", tags:["sex","Raw BJ"], interests:[7,29,27,24], height:`5'11"`, lookingFor:"Relationship", isNew:false, verified:false, bisexual:false, imgNum:32 },
  { id:"nai033", name:"Del", age:23, county:"Nairobi", town:"Karen", tags:["sex","Raw BJ"], interests:[17,0,14,18], height:`5'11"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:33 },
  { id:"nai034", name:"Lilian", age:24, county:"Nairobi", town:"Lavington", tags:["sex","Raw BJ"], interests:[5,2,1,17], height:`5'11"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:34 },
  { id:"nai035", name:"Nadira", age:21, county:"Nairobi", town:"South B", tags:["sex","Raw BJ"], interests:[23,16,21,0], height:`5'11"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:false, imgNum:35 },
  { id:"nai036", name:"Wes", age:23, county:"Nairobi", town:"Kasarani", tags:["sex","Raw BJ"], interests:[14,6,12,30], height:`5'11"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:true, bisexual:false, imgNum:36 },
  { id:"nai037", name:"Ida", age:22, county:"Nairobi", town:"Ruaraka", tags:["sex","Raw BJ"], interests:[30,0,15,8], height:`5'6"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:37 },
  { id:"nai038", name:"Vanessa", age:26, county:"Nairobi", town:"Zimmerman", tags:["sex","Raw BJ"], interests:[13,15,18,28], height:`5'9"`, lookingFor:"Long-term partner", isNew:true, verified:true, bisexual:true, imgNum:38 },
  { id:"nai039", name:"Cara", age:28, county:"Nairobi", town:"Uthiru", tags:["sex","Raw BJ"], interests:[6,8,15,1], height:`5'7"`, lookingFor:"Calm & present partner", isNew:false, verified:false, bisexual:false, imgNum:39 },
  { id:"nai040", name:"Judith", age:32, county:"Nairobi", town:"Kinoo", tags:["sex","Raw BJ"], interests:[11,17,9,28], height:`5'2"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:40 },
  { id:"mom041", name:"Gertrude", age:21, county:"Mombasa", town:"Nyali", tags:["sex","Raw BJ"], interests:[24,19,4,31], height:`5'11"`, lookingFor:"Grounded partner", isNew:false, verified:true, bisexual:false, imgNum:41 },
  { id:"mom042", name:"Xara", age:32, county:"Mombasa", town:"Tudor", tags:["sex","Raw BJ"], interests:[15,14,3,27], height:`5'9"`, lookingFor:"Grounded partner", isNew:false, verified:true, bisexual:false, imgNum:42 },
  { id:"mom043", name:"Lorna", age:30, county:"Mombasa", town:"Bamburi", tags:["sex","Raw BJ"], interests:[13,29,11,20], height:`5'9"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:43 },
  { id:"mom044", name:"Veronica", age:32, county:"Mombasa", town:"Shanzu", tags:["sex","Raw BJ"], interests:[0,21,29,1], height:`5'9"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:false, imgNum:44 },
  { id:"mom045", name:"Nduku", age:23, county:"Mombasa", town:"Mkomani", tags:["sex","Raw BJ"], interests:[24,31,14,25], height:`5'9"`, lookingFor:"Intellectual partner", isNew:false, verified:true, bisexual:false, imgNum:45 },
  { id:"mom046", name:"Nadira", age:26, county:"Mombasa", town:"Likoni", tags:["sex","Raw BJ"], interests:[21,16,29,24], height:`5'3"`, lookingFor:"Grounded partner", isNew:true, verified:false, bisexual:false, imgNum:46 },
  { id:"mom047", name:"Euvine", age:28, county:"Mombasa", town:"Kisauni", tags:["sex","Raw BJ"], interests:[4,19,11,27], height:`5'8"`, lookingFor:"Serious relationship", isNew:false, verified:true, bisexual:false, imgNum:47 },
  { id:"mom048", name:"Deborah", age:21, county:"Mombasa", town:"Diani", tags:["sex","Raw BJ"], interests:[17,28,1,20], height:`5'8"`, lookingFor:"Fun & Hookup", isNew:true, verified:true, bisexual:false, imgNum:48 },
  { id:"mom049", name:"Tabitha", age:20, county:"Mombasa", town:"Shelly Beach", tags:["sex","Raw BJ"], interests:[6,8,0,18], height:`5'4"`, lookingFor:"Serious relationship", isNew:false, verified:true, bisexual:false, imgNum:49 },
  { id:"mom050", name:"Vivian", age:29, county:"Mombasa", town:"Kongowea", tags:["sex","Raw BJ"], interests:[21,6,31,13], height:`5'7"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:false, imgNum:50 },
  { id:"mom051", name:"Lea", age:33, county:"Mombasa", town:"Old Town", tags:["sex","Raw BJ"], interests:[5,23,27,13], height:`5'2"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:51 },
  { id:"mom052", name:"Cherotich", age:24, county:"Mombasa", town:"Mtwapa", tags:["sex","Raw BJ"], interests:[0,26,31,17], height:`5'2"`, lookingFor:"Grounded partner", isNew:false, verified:true, bisexual:false, imgNum:52 },
  { id:"mom053", name:"Soila", age:21, county:"Mombasa", town:"Jomvu", tags:["sex","Raw BJ"], interests:[29,5,7,27], height:`5'4"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:53 },
  { id:"mom054", name:"Anna", age:20, county:"Mombasa", town:"Changamwe", tags:["sex","Raw BJ"], interests:[24,10,21,2], height:`5'4"`, lookingFor:"Long-term partner", isNew:false, verified:false, bisexual:false, imgNum:54 },
  { id:"mom055", name:"Elena", age:21, county:"Mombasa", town:"Miritini", tags:["sex","Raw BJ"], interests:[0,14,27,11], height:`5'2"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:true, bisexual:false, imgNum:55 },
  { id:"mom056", name:"Claudia", age:30, county:"Mombasa", town:"Kizingo", tags:["sex","Raw BJ"], interests:[15,24,13,14], height:`5'4"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:56 },
  { id:"mom057", name:"Joyce", age:22, county:"Mombasa", town:"Ganjoni", tags:["sex","Raw BJ"], interests:[13,17,10,5], height:`5'11"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:true, imgNum:57 },
  { id:"mom058", name:"Sara", age:29, county:"Mombasa", town:"Majengo", tags:["sex","Raw BJ"], interests:[7,28,15,10], height:`5'7"`, lookingFor:"Calm & present partner", isNew:false, verified:true, bisexual:false, imgNum:58 },
  { id:"mom059", name:"Kay", age:29, county:"Mombasa", town:"Tononoka", tags:["sex","Raw BJ"], interests:[19,18,28,20], height:`5'2"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:true, imgNum:59 },
  { id:"mom060", name:"Vera", age:28, county:"Mombasa", town:"Mikindani", tags:["sex","Raw BJ"], interests:[25,17,9,1], height:`5'6"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:60 },
  { id:"mom061", name:"Amani", age:26, county:"Mombasa", town:"Nyali", tags:["sex","Raw BJ"], interests:[5,14,18,9], height:`5'8"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:false, imgNum:61 },
  { id:"mom062", name:"Dee", age:19, county:"Mombasa", town:"Tudor", tags:["sex","Raw BJ"], interests:[1,8,16,29], height:`5'6"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:true, bisexual:false, imgNum:62 },
  { id:"mom063", name:"Mia", age:33, county:"Mombasa", town:"Bamburi", tags:["sex","Raw BJ"], interests:[2,13,30,27], height:`5'6"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:63 },
  { id:"mom064", name:"Priscilla", age:34, county:"Mombasa", town:"Shanzu", tags:["sex","Raw BJ"], interests:[24,26,30,4], height:`5'11"`, lookingFor:"Serious relationship", isNew:false, verified:true, bisexual:true, imgNum:64 },
  { id:"mom065", name:"Violet", age:22, county:"Mombasa", town:"Mkomani", tags:["sex","Raw BJ"], interests:[11,4,18,6], height:`5'8"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:65 },
  { id:"mom066", name:"Olivia", age:31, county:"Mombasa", town:"Likoni", tags:["sex","Raw BJ"], interests:[13,4,29,2], height:`5'6"`, lookingFor:"Intellectual partner", isNew:true, verified:false, bisexual:false, imgNum:66 },
  { id:"mom067", name:"Flora", age:33, county:"Mombasa", town:"Kisauni", tags:["sex","Raw BJ"], interests:[18,17,26,24], height:`5'8"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:false, imgNum:67 },
  { id:"mom068", name:"Akoth", age:19, county:"Mombasa", town:"Diani", tags:["sex","Raw BJ"], interests:[0,11,2,5], height:`5'9"`, lookingFor:"Fun & Hookup", isNew:false, verified:true, bisexual:false, imgNum:68 },
  { id:"mom069", name:"Rachel", age:24, county:"Mombasa", town:"Shelly Beach", tags:["sex","Raw BJ"], interests:[30,31,1,19], height:`5'9"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:69 },
  { id:"mom070", name:"Dorcas", age:25, county:"Mombasa", town:"Kongowea", tags:["sex","Raw BJ"], interests:[17,23,8,28], height:`5'2"`, lookingFor:"Relationship", isNew:true, verified:true, bisexual:false, imgNum:70 },
  { id:"nak071", name:"Patricia", age:24, county:"Nakuru", town:"Nakuru Town", tags:["sex","Raw BJ"], interests:[22,10,24,14], height:`5'9"`, lookingFor:"Calm & present partner", isNew:true, verified:false, bisexual:false, imgNum:71 },
  { id:"nak072", name:"Pam", age:33, county:"Nakuru", town:"Milimani", tags:["sex","Raw BJ"], interests:[24,30,28,20], height:`5'6"`, lookingFor:"Intellectual partner", isNew:false, verified:true, bisexual:false, imgNum:72 },
  { id:"nak073", name:"Beatrice", age:33, county:"Nakuru", town:"Section 58", tags:["sex","Raw BJ"], interests:[15,12,26,30], height:`5'8"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:73 },
  { id:"nak074", name:"Leah", age:29, county:"Nakuru", town:"Pipeline", tags:["sex","Raw BJ"], interests:[2,0,4,8], height:`5'5"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:74 },
  { id:"nak075", name:"Sara", age:24, county:"Nakuru", town:"Lanet", tags:["sex","Raw BJ"], interests:[21,18,27,1], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:75 },
  { id:"nak076", name:"Betty", age:24, county:"Nakuru", town:"Free Area", tags:["sex","Raw BJ"], interests:[25,21,11,12], height:`5'5"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:76 },
  { id:"nak077", name:"Amy", age:30, county:"Nakuru", town:"Flamingo", tags:["sex","Raw BJ"], interests:[0,22,6,4], height:`5'8"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:false, bisexual:false, imgNum:77 },
  { id:"nak078", name:"Isla", age:24, county:"Nakuru", town:"Barnabas", tags:["sex","Raw BJ"], interests:[23,17,7,13], height:`5'9"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:78 },
  { id:"nak079", name:"Winnie", age:26, county:"Nakuru", town:"Bondeni", tags:["sex","Raw BJ"], interests:[22,12,10,16], height:`5'6"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:false, imgNum:79 },
  { id:"nak080", name:"Xenia", age:25, county:"Nakuru", town:"London", tags:["sex","Raw BJ"], interests:[27,0,22,6], height:`5'9"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:80 },
  { id:"nak081", name:"Fay", age:23, county:"Nakuru", town:"Nakuru Town", tags:["sex","Raw BJ"], interests:[1,7,11,30], height:`5'5"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:false, imgNum:81 },
  { id:"nak082", name:"Salome", age:29, county:"Nakuru", town:"Milimani", tags:["sex","Raw BJ"], interests:[13,23,15,4], height:`5'7"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:82 },
  { id:"nak083", name:"Xin", age:22, county:"Nakuru", town:"Section 58", tags:["sex","Raw BJ"], interests:[16,0,20,7], height:`5'10"`, lookingFor:"Fun & Hookup", isNew:false, verified:false, bisexual:false, imgNum:83 },
  { id:"nak084", name:"Pauline", age:29, county:"Nakuru", town:"Pipeline", tags:["sex","Raw BJ"], interests:[29,0,22,20], height:`5'11"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:84 },
  { id:"nak085", name:"Tabitha", age:34, county:"Nakuru", town:"Lanet", tags:["sex","Raw BJ"], interests:[20,31,10,1], height:`5'3"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:false, imgNum:85 },
  { id:"nak086", name:"Teresa", age:27, county:"Nakuru", town:"Free Area", tags:["sex","Raw BJ"], interests:[23,8,10,11], height:`5'7"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:86 },
  { id:"nak087", name:"Hana", age:25, county:"Nakuru", town:"Flamingo", tags:["sex","Raw BJ"], interests:[26,23,25,1], height:`5'3"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:87 },
  { id:"nak088", name:"Yvonne", age:25, county:"Nakuru", town:"Barnabas", tags:["sex","Raw BJ"], interests:[5,23,14,29], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:88 },
  { id:"nak089", name:"Lorna", age:21, county:"Nakuru", town:"Bondeni", tags:["sex","Raw BJ"], interests:[31,18,12,29], height:`5'8"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:89 },
  { id:"nak090", name:"Penelope", age:23, county:"Nakuru", town:"London", tags:["sex","Raw BJ"], interests:[3,2,15,21], height:`5'11"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:90 },
  { id:"nak091", name:"Pamela", age:23, county:"Nakuru", town:"Nakuru Town", tags:["sex","Raw BJ"], interests:[14,25,31,15], height:`5'11"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:false, imgNum:91 },
  { id:"nak092", name:"Doreen", age:30, county:"Nakuru", town:"Milimani", tags:["sex","Raw BJ"], interests:[5,11,1,9], height:`5'10"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:92 },
  { id:"nak093", name:"Christine", age:21, county:"Nakuru", town:"Section 58", tags:["sex","Raw BJ"], interests:[13,19,2,28], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:93 },
  { id:"nak094", name:"Wes", age:27, county:"Nakuru", town:"Pipeline", tags:["sex","Raw BJ"], interests:[25,7,3,0], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:true, imgNum:94 },
  { id:"nak095", name:"Ann", age:25, county:"Nakuru", town:"Lanet", tags:["sex","Raw BJ"], interests:[16,6,17,14], height:`5'3"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:95 },
  { id:"kia096", name:"Irene", age:20, county:"Kiambu", town:"Thindigua", tags:["sex","Raw BJ"], interests:[9,10,26,14], height:`5'4"`, lookingFor:"Relationship", isNew:true, verified:false, bisexual:true, imgNum:96 },
  { id:"kia097", name:"Cynthia", age:29, county:"Kiambu", town:"Ruiru", tags:["sex","Raw BJ"], interests:[11,2,23,27], height:`5'7"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:97 },
  { id:"kia098", name:"Lydia", age:24, county:"Kiambu", town:"Kiambu Town", tags:["sex","Raw BJ"], interests:[14,28,16,22], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:98 },
  { id:"kia099", name:"Rose", age:25, county:"Kiambu", town:"Thika", tags:["sex","Raw BJ"], interests:[24,30,27,23], height:`5'10"`, lookingFor:"Fun & Hookup", isNew:false, verified:false, bisexual:false, imgNum:99 },
  { id:"kia100", name:"Dorcas", age:30, county:"Kiambu", town:"Limuru", tags:["sex","Raw BJ"], interests:[26,24,9,5], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:100 },
  { id:"kia101", name:"Naomi", age:29, county:"Kiambu", town:"Kikuyu", tags:["sex","Raw BJ"], interests:[11,0,23,19], height:`5'8"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:101 },
  { id:"kia102", name:"Bianca", age:30, county:"Kiambu", town:"Juja", tags:["sex","Raw BJ"], interests:[2,22,5,9], height:`5'5"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:102 },
  { id:"kia103", name:"Ann", age:32, county:"Kiambu", town:"Githurai", tags:["sex","Raw BJ"], interests:[30,9,22,10], height:`5'3"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:103 },
  { id:"kia104", name:"Pam", age:28, county:"Kiambu", town:"Rongai", tags:["sex","Raw BJ"], interests:[23,14,18,7], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:104 },
  { id:"kia105", name:"Beatrice", age:20, county:"Kiambu", town:"Tigoni", tags:["sex","Raw BJ"], interests:[10,15,14,3], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:true, imgNum:105 },
  { id:"kia106", name:"Mary", age:24, county:"Kiambu", town:"Thindigua", tags:["sex","Raw BJ"], interests:[24,29,27,25], height:`5'5"`, lookingFor:"Serious relationship", isNew:true, verified:true, bisexual:false, imgNum:106 },
  { id:"kia107", name:"Wanjiru", age:33, county:"Kiambu", town:"Ruiru", tags:["sex","Raw BJ"], interests:[28,13,25,27], height:`5'10"`, lookingFor:"Grounded partner", isNew:true, verified:true, bisexual:false, imgNum:107 },
  { id:"kia108", name:"Mwikali", age:22, county:"Kiambu", town:"Kiambu Town", tags:["sex","Raw BJ"], interests:[23,19,18,2], height:`5'8"`, lookingFor:"Calm & present partner", isNew:false, verified:true, bisexual:false, imgNum:108 },
  { id:"kia109", name:"Sarah", age:35, county:"Kiambu", town:"Thika", tags:["sex","Raw BJ"], interests:[23,31,13,12], height:`5'4"`, lookingFor:"Fun & Hookup", isNew:false, verified:true, bisexual:true, imgNum:109 },
  { id:"kia110", name:"Salma", age:34, county:"Kiambu", town:"Limuru", tags:["sex","Raw BJ"], interests:[0,18,27,10], height:`5'7"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:110 },
  { id:"kia111", name:"Marion", age:29, county:"Kiambu", town:"Kikuyu", tags:["sex","Raw BJ"], interests:[18,13,20,5], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:true, imgNum:111 },
  { id:"kia112", name:"Winnie", age:23, county:"Kiambu", town:"Juja", tags:["sex","Raw BJ"], interests:[26,0,15,24], height:`5'9"`, lookingFor:"Relationship", isNew:true, verified:true, bisexual:false, imgNum:112 },
  { id:"kia113", name:"Cess", age:33, county:"Kiambu", town:"Githurai", tags:["sex","Raw BJ"], interests:[17,3,18,2], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:113 },
  { id:"kia114", name:"Val", age:20, county:"Kiambu", town:"Rongai", tags:["sex","Raw BJ"], interests:[18,16,31,4], height:`5'6"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:114 },
  { id:"kia115", name:"Wangechi", age:26, county:"Kiambu", town:"Tigoni", tags:["sex","Raw BJ"], interests:[31,17,11,18], height:`5'8"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:115 },
  { id:"kia116", name:"Wes", age:30, county:"Kiambu", town:"Thindigua", tags:["sex","Raw BJ"], interests:[24,16,27,15], height:`5'7"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:false, imgNum:116 },
  { id:"kia117", name:"Esther", age:27, county:"Kiambu", town:"Ruiru", tags:["sex","Raw BJ"], interests:[17,23,11,9], height:`5'8"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:117 },
  { id:"kia118", name:"Cal", age:31, county:"Kiambu", town:"Kiambu Town", tags:["sex","Raw BJ"], interests:[4,9,15,1], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:118 },
  { id:"kia119", name:"Vanessa", age:32, county:"Kiambu", town:"Thika", tags:["sex","Raw BJ"], interests:[13,20,24,29], height:`5'2"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:119 },
  { id:"kia120", name:"Isla", age:21, county:"Kiambu", town:"Limuru", tags:["sex","Raw BJ"], interests:[1,14,5,26], height:`5'11"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:true, imgNum:120 },
  { id:"kis121", name:"Ashley", age:34, county:"Kisumu", town:"Milimani", tags:["sex","Raw BJ"], interests:[6,31,18,17], height:`5'7"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:true, imgNum:121 },
  { id:"kis122", name:"Maureen", age:19, county:"Kisumu", town:"Kisumu CBD", tags:["sex","Raw BJ"], interests:[22,15,31,25], height:`5'6"`, lookingFor:"Something real", isNew:false, verified:false, bisexual:false, imgNum:122 },
  { id:"kis123", name:"Aisha", age:26, county:"Kisumu", town:"Kondele", tags:["sex","Raw BJ"], interests:[7,6,18,12], height:`5'9"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:123 },
  { id:"kis124", name:"Christine", age:25, county:"Kisumu", town:"Riat Hills", tags:["sex","Raw BJ"], interests:[31,2,9,19], height:`5'2"`, lookingFor:"Life partner", isNew:false, verified:false, bisexual:true, imgNum:124 },
  { id:"kis125", name:"Nova", age:25, county:"Kisumu", town:"Dunga", tags:["sex","Raw BJ"], interests:[8,29,2,9], height:`5'3"`, lookingFor:"Calm & present partner", isNew:false, verified:true, bisexual:false, imgNum:125 },
  { id:"kis126", name:"Esther", age:30, county:"Kisumu", town:"Lolwe", tags:["sex","Raw BJ"], interests:[27,16,29,23], height:`5'11"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:126 },
  { id:"kis127", name:"Nancy", age:21, county:"Kisumu", town:"Kibuye", tags:["sex","Raw BJ"], interests:[8,2,17,12], height:`5'9"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:127 },
  { id:"kis128", name:"Nduku", age:26, county:"Kisumu", town:"Mamboleo", tags:["sex","Raw BJ"], interests:[5,17,28,19], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:128 },
  { id:"kis129", name:"Norah", age:23, county:"Kisumu", town:"Nyalenda", tags:["sex","Raw BJ"], interests:[4,2,31,21], height:`5'11"`, lookingFor:"Relationship", isNew:true, verified:false, bisexual:false, imgNum:129 },
  { id:"kis130", name:"Soila", age:25, county:"Kisumu", town:"Manyatta", tags:["sex","Raw BJ"], interests:[20,6,8,25], height:`5'2"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:true, imgNum:130 },
  { id:"kis131", name:"Winifred", age:26, county:"Kisumu", town:"Milimani", tags:["sex","Raw BJ"], interests:[7,23,16,22], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:131 },
  { id:"kis132", name:"Eva", age:28, county:"Kisumu", town:"Kisumu CBD", tags:["sex","Raw BJ"], interests:[11,14,20,4], height:`5'5"`, lookingFor:"Fun & Hookup", isNew:false, verified:false, bisexual:false, imgNum:132 },
  { id:"kis133", name:"Moraa", age:31, county:"Kisumu", town:"Kondele", tags:["sex","Raw BJ"], interests:[14,24,28,5], height:`5'9"`, lookingFor:"Calm & present partner", isNew:true, verified:true, bisexual:false, imgNum:133 },
  { id:"kis134", name:"Julia", age:34, county:"Kisumu", town:"Riat Hills", tags:["sex","Raw BJ"], interests:[28,25,2,3], height:`5'5"`, lookingFor:"Calm & present partner", isNew:false, verified:false, bisexual:false, imgNum:134 },
  { id:"kis135", name:"Nyambura", age:29, county:"Kisumu", town:"Dunga", tags:["sex","Raw BJ"], interests:[9,23,3,11], height:`5'6"`, lookingFor:"Fun & Hookup", isNew:false, verified:true, bisexual:false, imgNum:135 },
  { id:"kis136", name:"Josephine", age:28, county:"Kisumu", town:"Lolwe", tags:["sex","Raw BJ"], interests:[19,2,20,17], height:`5'6"`, lookingFor:"Fun & Hookup", isNew:true, verified:true, bisexual:false, imgNum:136 },
  { id:"kis137", name:"Wendy", age:30, county:"Kisumu", town:"Kibuye", tags:["sex","Raw BJ"], interests:[17,5,11,4], height:`5'9"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:false, imgNum:137 },
  { id:"kis138", name:"Jemutai", age:29, county:"Kisumu", town:"Mamboleo", tags:["sex","Raw BJ"], interests:[5,20,8,18], height:`5'7"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:false, imgNum:138 },
  { id:"kis139", name:"Dama", age:31, county:"Kisumu", town:"Nyalenda", tags:["sex","Raw BJ"], interests:[26,20,8,24], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:139 },
  { id:"kis140", name:"Stella", age:25, county:"Kisumu", town:"Manyatta", tags:["sex","Raw BJ"], interests:[19,10,11,24], height:`5'6"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:true, imgNum:140 },
  { id:"uas141", name:"Anna", age:25, county:"Uasin Gishu", town:"Eldoret", tags:["sex","Raw BJ"], interests:[23,30,0,26], height:`5'5"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:141 },
  { id:"uas142", name:"Pendo", age:33, county:"Uasin Gishu", town:"Kapseret", tags:["sex","Raw BJ"], interests:[4,11,12,15], height:`5'4"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:142 },
  { id:"uas143", name:"Joy", age:23, county:"Uasin Gishu", town:"Langas", tags:["sex","Raw BJ"], interests:[25,9,31,17], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:143 },
  { id:"uas144", name:"Wambui", age:32, county:"Uasin Gishu", town:"Huruma", tags:["sex","Raw BJ"], interests:[8,13,6,9], height:`5'3"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:true, imgNum:144 },
  { id:"uas145", name:"Flora", age:23, county:"Uasin Gishu", town:"Kimumu", tags:["sex","Raw BJ"], interests:[8,28,14,7], height:`5'5"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:145 },
  { id:"uas146", name:"Kemunto", age:25, county:"Uasin Gishu", town:"Pioneer", tags:["sex","Raw BJ"], interests:[13,3,4,27], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:146 },
  { id:"uas147", name:"Zawadi", age:22, county:"Uasin Gishu", town:"Eldoret", tags:["sex","Raw BJ"], interests:[29,25,22,10], height:`5'2"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:147 },
  { id:"uas148", name:"Nina", age:25, county:"Uasin Gishu", town:"Kapseret", tags:["sex","Raw BJ"], interests:[11,13,26,7], height:`5'10"`, lookingFor:"Something real", isNew:false, verified:true, bisexual:false, imgNum:148 },
  { id:"uas149", name:"Pam", age:22, county:"Uasin Gishu", town:"Langas", tags:["sex","Raw BJ"], interests:[22,31,27,26], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:149 },
  { id:"uas150", name:"Bertha", age:32, county:"Uasin Gishu", town:"Huruma", tags:["sex","Raw BJ"], interests:[25,23,22,0], height:`5'3"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:150 },
  { id:"uas151", name:"Rachael", age:32, county:"Uasin Gishu", town:"Kimumu", tags:["sex","Raw BJ"], interests:[4,3,29,13], height:`5'6"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:151 },
  { id:"uas152", name:"Tabitha", age:19, county:"Uasin Gishu", town:"Pioneer", tags:["sex","Raw BJ"], interests:[13,4,29,6], height:`5'3"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:false, imgNum:152 },
  { id:"mac153", name:"Hilda", age:32, county:"Machakos", town:"Machakos Town", tags:["sex","Raw BJ"], interests:[17,26,27,3], height:`5'3"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:153 },
  { id:"mac154", name:"Alice", age:23, county:"Machakos", town:"Athi River", tags:["sex","Raw BJ"], interests:[2,24,22,5], height:`5'3"`, lookingFor:"Fun & Hookup", isNew:false, verified:false, bisexual:true, imgNum:154 },
  { id:"mac155", name:"Val", age:21, county:"Machakos", town:"Katani", tags:["sex","Raw BJ"], interests:[0,5,18,19], height:`5'4"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:155 },
  { id:"mac156", name:"Vivienne", age:28, county:"Machakos", town:"Kangundo", tags:["sex","Raw BJ"], interests:[0,2,15,12], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:156 },
  { id:"mac157", name:"Ann", age:23, county:"Machakos", town:"Syokimau", tags:["sex","Raw BJ"], interests:[15,18,9,7], height:`5'4"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:157 },
  { id:"mac158", name:"Salma", age:34, county:"Machakos", town:"Mlolongo", tags:["sex","Raw BJ"], interests:[21,1,27,7], height:`5'11"`, lookingFor:"Life partner", isNew:true, verified:true, bisexual:false, imgNum:158 },
  { id:"mac159", name:"Lydia", age:22, county:"Machakos", town:"Machakos Town", tags:["sex","Raw BJ"], interests:[2,22,21,14], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:159 },
  { id:"mac160", name:"Wes", age:23, county:"Machakos", town:"Athi River", tags:["sex","Raw BJ"], interests:[4,15,2,21], height:`5'5"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:true, imgNum:160 },
  { id:"mac161", name:"Pendo", age:27, county:"Machakos", town:"Katani", tags:["sex","Raw BJ"], interests:[25,16,18,27], height:`5'2"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:161 },
  { id:"mac162", name:"Zara", age:32, county:"Machakos", town:"Kangundo", tags:["sex","Raw BJ"], interests:[0,17,26,21], height:`5'10"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:true, imgNum:162 },
  { id:"mac163", name:"Sara", age:27, county:"Machakos", town:"Syokimau", tags:["sex","Raw BJ"], interests:[14,25,1,19], height:`5'5"`, lookingFor:"Relationship", isNew:false, verified:false, bisexual:false, imgNum:163 },
  { id:"mac164", name:"Nina", age:30, county:"Machakos", town:"Mlolongo", tags:["sex","Raw BJ"], interests:[8,26,7,12], height:`5'4"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:164 },
  { id:"mer165", name:"Phoebe", age:20, county:"Meru", town:"Meru Town", tags:["sex","Raw BJ"], interests:[19,7,2,20], height:`5'5"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:false, bisexual:false, imgNum:165 },
  { id:"mer166", name:"Bea", age:19, county:"Meru", town:"Nkubu", tags:["sex","Raw BJ"], interests:[22,9,14,27], height:`5'4"`, lookingFor:"Fun & Hookup", isNew:false, verified:false, bisexual:false, imgNum:166 },
  { id:"mer167", name:"Miriam", age:35, county:"Meru", town:"Maua", tags:["sex","Raw BJ"], interests:[16,19,23,4], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:167 },
  { id:"mer168", name:"Dee", age:26, county:"Meru", town:"Timau", tags:["sex","Raw BJ"], interests:[31,8,16,15], height:`5'8"`, lookingFor:"Adventure partner", isNew:true, verified:false, bisexual:false, imgNum:168 },
  { id:"mer169", name:"Judith", age:21, county:"Meru", town:"Meru Town", tags:["sex","Raw BJ"], interests:[26,16,13,15], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:169 },
  { id:"mer170", name:"Josephine", age:25, county:"Meru", town:"Nkubu", tags:["sex","Raw BJ"], interests:[31,25,1,2], height:`5'11"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:true, imgNum:170 },
  { id:"mer171", name:"Ola", age:34, county:"Meru", town:"Maua", tags:["sex","Raw BJ"], interests:[11,29,20,26], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:true, imgNum:171 },
  { id:"mer172", name:"Yen", age:29, county:"Meru", town:"Timau", tags:["sex","Raw BJ"], interests:[5,10,1,25], height:`5'3"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:172 },
  { id:"nye173", name:"Maya", age:20, county:"Nyeri", town:"Nyeri Town", tags:["sex","Raw BJ"], interests:[1,21,13,2], height:`5'5"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:false, imgNum:173 },
  { id:"nye174", name:"Lilian", age:24, county:"Nyeri", town:"Karatina", tags:["sex","Raw BJ"], interests:[20,24,6,1], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:174 },
  { id:"nye175", name:"Linnet", age:28, county:"Nyeri", town:"Othaya", tags:["sex","Raw BJ"], interests:[24,20,25,12], height:`5'7"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:false, imgNum:175 },
  { id:"nye176", name:"Evelyn", age:27, county:"Nyeri", town:"Mukurweini", tags:["sex","Raw BJ"], interests:[30,12,5,3], height:`5'8"`, lookingFor:"Fun & Hookup", isNew:false, verified:true, bisexual:false, imgNum:176 },
  { id:"nye177", name:"Xenia", age:28, county:"Nyeri", town:"Nyeri Town", tags:["sex","Raw BJ"], interests:[7,31,16,12], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:true, imgNum:177 },
  { id:"nye178", name:"Melissa", age:22, county:"Nyeri", town:"Karatina", tags:["sex","Raw BJ"], interests:[8,15,6,12], height:`5'5"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:178 },
  { id:"nye179", name:"Felicia", age:25, county:"Nyeri", town:"Othaya", tags:["sex","Raw BJ"], interests:[7,28,18,0], height:`5'4"`, lookingFor:"Serious relationship", isNew:false, verified:true, bisexual:false, imgNum:179 },
  { id:"nye180", name:"Dee", age:28, county:"Nyeri", town:"Mukurweini", tags:["sex","Raw BJ"], interests:[16,9,30,8], height:`5'10"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:180 },
  { id:"kak181", name:"Carolyn", age:23, county:"Kakamega", town:"Kakamega Town", tags:["sex","Raw BJ"], interests:[16,3,18,9], height:`5'4"`, lookingFor:"Calm & present partner", isNew:false, verified:true, bisexual:false, imgNum:181 },
  { id:"kak182", name:"Pam", age:27, county:"Kakamega", town:"Mumias", tags:["sex","Raw BJ"], interests:[24,25,17,6], height:`5'11"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:182 },
  { id:"kak183", name:"Sara", age:29, county:"Kakamega", town:"Lurambi", tags:["sex","Raw BJ"], interests:[2,17,4,3], height:`5'7"`, lookingFor:"Life partner", isNew:true, verified:false, bisexual:true, imgNum:183 },
  { id:"kak184", name:"Lea", age:34, county:"Kakamega", town:"Shinyalu", tags:["sex","Raw BJ"], interests:[14,8,1,3], height:`5'4"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:true, imgNum:184 },
  { id:"kak185", name:"Lydia", age:35, county:"Kakamega", town:"Kakamega Town", tags:["sex","Raw BJ"], interests:[14,5,4,30], height:`5'9"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:185 },
  { id:"kak186", name:"Caro", age:33, county:"Kakamega", town:"Mumias", tags:["sex","Raw BJ"], interests:[7,19,25,13], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:186 },
  { id:"kak187", name:"Ola", age:22, county:"Kakamega", town:"Lurambi", tags:["sex","Raw BJ"], interests:[18,22,9,8], height:`5'8"`, lookingFor:"Serious relationship", isNew:true, verified:true, bisexual:false, imgNum:187 },
  { id:"kak188", name:"Mary", age:31, county:"Kakamega", town:"Shinyalu", tags:["sex","Raw BJ"], interests:[25,9,8,31], height:`5'6"`, lookingFor:"Calm & present partner", isNew:true, verified:true, bisexual:false, imgNum:188 },
  { id:"kil189", name:"Nduku", age:24, county:"Kilifi", town:"Kilifi Town", tags:["sex","Raw BJ"], interests:[20,28,26,10], height:`5'4"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:false, imgNum:189 },
  { id:"kil190", name:"Leila", age:31, county:"Kilifi", town:"Mtwapa", tags:["sex","Raw BJ"], interests:[2,18,28,20], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:true, imgNum:190 },
  { id:"kil191", name:"Rehema", age:27, county:"Kilifi", town:"Malindi", tags:["sex","Raw BJ"], interests:[1,24,9,8], height:`5'3"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:191 },
  { id:"kil192", name:"Veronica", age:23, county:"Kilifi", town:"Watamu", tags:["sex","Raw BJ"], interests:[15,22,12,21], height:`5'2"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:192 },
  { id:"kil193", name:"Sabrina", age:28, county:"Kilifi", town:"Kilifi Town", tags:["sex","Raw BJ"], interests:[2,5,19,30], height:`5'5"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:false, imgNum:193 },
  { id:"kil194", name:"Beatrice", age:26, county:"Kilifi", town:"Mtwapa", tags:["sex","Raw BJ"], interests:[3,12,11,1], height:`5'10"`, lookingFor:"Calm & present partner", isNew:false, verified:true, bisexual:true, imgNum:194 },
  { id:"kil195", name:"Una", age:28, county:"Kilifi", town:"Malindi", tags:["sex","Raw BJ"], interests:[7,30,4,22], height:`5'4"`, lookingFor:"Long-term partner", isNew:false, verified:true, bisexual:false, imgNum:195 },
  { id:"kil196", name:"Kay", age:29, county:"Kilifi", town:"Watamu", tags:["sex","Raw BJ"], interests:[16,0,28,14], height:`5'5"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:196 },
  { id:"kwa197", name:"Tina", age:33, county:"Kwale", town:"Ukunda", tags:["sex","Raw BJ"], interests:[21,31,9,26], height:`5'4"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:197 },
  { id:"kwa198", name:"Teresa", age:32, county:"Kwale", town:"Kwale Town", tags:["sex","Raw BJ"], interests:[8,17,21,12], height:`5'7"`, lookingFor:"Serious relationship", isNew:true, verified:true, bisexual:false, imgNum:198 },
  { id:"kwa199", name:"Nina", age:21, county:"Kwale", town:"Msambweni", tags:["sex","Raw BJ"], interests:[29,30,9,17], height:`5'8"`, lookingFor:"Intellectual partner", isNew:false, verified:false, bisexual:false, imgNum:199 },
  { id:"kwa200", name:"Queen", age:26, county:"Kwale", town:"Lungalunga", tags:["sex","Raw BJ"], interests:[16,25,13,23], height:`5'4"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:false, imgNum:200 },
  { id:"kwa201", name:"Carolyn", age:33, county:"Kwale", town:"Diani", tags:["sex","Raw BJ"], interests:[19,28,29,3], height:`5'4"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:201 },
  { id:"lai202", name:"Lea", age:22, county:"Laikipia", town:"Nanyuki", tags:["sex","Raw BJ"], interests:[3,2,22,14], height:`5'3"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:false, imgNum:202 },
  { id:"lai203", name:"Cherotich", age:27, county:"Laikipia", town:"Rumuruti", tags:["sex","Raw BJ"], interests:[23,5,31,11], height:`5'4"`, lookingFor:"Long-term partner", isNew:false, verified:false, bisexual:true, imgNum:203 },
  { id:"lai204", name:"Xara", age:28, county:"Laikipia", town:"Nyahururu", tags:["sex","Raw BJ"], interests:[19,7,25,20], height:`5'9"`, lookingFor:"Serious relationship", isNew:true, verified:false, bisexual:false, imgNum:204 },
  { id:"lai205", name:"Leila", age:22, county:"Laikipia", town:"Ol Kalou", tags:["sex","Raw BJ"], interests:[25,13,24,7], height:`5'8"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:205 },
  { id:"lai206", name:"Fiona", age:35, county:"Laikipia", town:"Kinamba", tags:["sex","Raw BJ"], interests:[21,10,18,0], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:206 },
  { id:"mur207", name:"Lydia", age:20, county:"Muranga", town:"Muranga Town", tags:["sex","Raw BJ"], interests:[25,9,3,4], height:`5'5"`, lookingFor:"Grounded partner", isNew:false, verified:false, bisexual:false, imgNum:207 },
  { id:"mur208", name:"Linda", age:21, county:"Muranga", town:"Kangema", tags:["sex","Raw BJ"], interests:[27,4,24,0], height:`5'6"`, lookingFor:"Hookup", isNew:true, verified:false, bisexual:false, imgNum:208 },
  { id:"mur209", name:"Phoebe", age:34, county:"Muranga", town:"Maragua", tags:["sex","Raw BJ"], interests:[13,8,25,1], height:`5'4"`, lookingFor:"Relationship", isNew:false, verified:false, bisexual:false, imgNum:209 },
  { id:"mur210", name:"Wes", age:25, county:"Muranga", town:"Kandara", tags:["sex","Raw BJ"], interests:[11,13,3,28], height:`5'2"`, lookingFor:"Life partner", isNew:false, verified:false, bisexual:false, imgNum:210 },
  { id:"mur211", name:"Stella", age:25, county:"Muranga", town:"Kenol", tags:["sex","Raw BJ"], interests:[20,25,6,4], height:`5'5"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:211 },
  { id:"kaj212", name:"Yen", age:27, county:"Kajiado", town:"Kajiado Town", tags:["sex","Raw BJ"], interests:[13,26,29,19], height:`5'7"`, lookingFor:"Life partner", isNew:true, verified:true, bisexual:false, imgNum:212 },
  { id:"kaj213", name:"Norah", age:24, county:"Kajiado", town:"Ngong", tags:["sex","Raw BJ"], interests:[13,29,6,11], height:`5'10"`, lookingFor:"Relationship", isNew:true, verified:false, bisexual:false, imgNum:213 },
  { id:"kaj214", name:"Kemunto", age:24, county:"Kajiado", town:"Ongata Rongai", tags:["sex","Raw BJ"], interests:[13,1,22,6], height:`5'6"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:214 },
  { id:"kaj215", name:"Hilda", age:32, county:"Kajiado", town:"Kitengela", tags:["sex","Raw BJ"], interests:[12,28,26,1], height:`5'6"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:215 },
  { id:"kaj216", name:"Kadzo", age:19, county:"Kajiado", town:"Namanga", tags:["sex","Raw BJ"], interests:[27,14,5,2], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:216 },
  { id:"kir217", name:"Abigail", age:33, county:"Kirinyaga", town:"Kerugoya", tags:["sex","Raw BJ"], interests:[25,2,11,5], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:217 },
  { id:"kir218", name:"Lydia", age:20, county:"Kirinyaga", town:"Sagana", tags:["sex","Raw BJ"], interests:[11,16,4,6], height:`5'2"`, lookingFor:"Long-term partner", isNew:false, verified:false, bisexual:false, imgNum:218 },
  { id:"kir219", name:"Kira", age:34, county:"Kirinyaga", town:"Kutus", tags:["sex","Raw BJ"], interests:[11,5,10,18], height:`5'4"`, lookingFor:"Hookup", isNew:true, verified:true, bisexual:false, imgNum:219 },
  { id:"kir220", name:"Helen", age:22, county:"Kirinyaga", town:"Wanguru", tags:["sex","Raw BJ"], interests:[16,1,12,24], height:`5'6"`, lookingFor:"Relationship", isNew:true, verified:false, bisexual:false, imgNum:220 },
  { id:"kir221", name:"Hilda", age:26, county:"Kirinyaga", town:"Kagio", tags:["sex","Raw BJ"], interests:[11,7,14,20], height:`5'9"`, lookingFor:"Adventure partner", isNew:false, verified:false, bisexual:false, imgNum:221 },
  { id:"sia222", name:"Wairimu", age:19, county:"Siaya", town:"Siaya Town", tags:["sex","Raw BJ"], interests:[15,7,23,21], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:222 },
  { id:"sia223", name:"Pia", age:28, county:"Siaya", town:"Bondo", tags:["sex","Raw BJ"], interests:[10,18,9,27], height:`5'9"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:223 },
  { id:"sia224", name:"Mariamu", age:25, county:"Siaya", town:"Ugunja", tags:["sex","Raw BJ"], interests:[31,10,23,6], height:`5'10"`, lookingFor:"Relationship", isNew:false, verified:true, bisexual:false, imgNum:224 },
  { id:"sia225", name:"Stella", age:24, county:"Siaya", town:"Rarieda", tags:["sex","Raw BJ"], interests:[25,24,30,18], height:`5'4"`, lookingFor:"Intellectual partner", isNew:true, verified:false, bisexual:false, imgNum:225 },
  { id:"sia226", name:"Zara", age:19, county:"Siaya", town:"Yala", tags:["sex","Raw BJ"], interests:[1,27,5,21], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:226 },
  { id:"hom227", name:"Edith", age:27, county:"Homa Bay", town:"Homa Bay Town", tags:["sex","Raw BJ"], interests:[20,15,5,2], height:`5'5"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:false, bisexual:false, imgNum:227 },
  { id:"hom228", name:"Ora", age:31, county:"Homa Bay", town:"Mbita", tags:["sex","Raw BJ"], interests:[17,8,15,2], height:`5'6"`, lookingFor:"Fun & Hookup", isNew:true, verified:false, bisexual:false, imgNum:228 },
  { id:"hom229", name:"Jane", age:23, county:"Homa Bay", town:"Oyugis", tags:["sex","Raw BJ"], interests:[19,3,1,5], height:`5'4"`, lookingFor:"Long-term partner", isNew:false, verified:false, bisexual:false, imgNum:229 },
  { id:"hom230", name:"Leila", age:33, county:"Homa Bay", town:"Ndhiwa", tags:["sex","Raw BJ"], interests:[21,18,12,22], height:`5'7"`, lookingFor:"Adventure partner", isNew:false, verified:true, bisexual:true, imgNum:230 },
  { id:"hom231", name:"Amina", age:26, county:"Homa Bay", town:"Kendu Bay", tags:["sex","Raw BJ"], interests:[6,22,13,24], height:`5'3"`, lookingFor:"Long-term partner", isNew:false, verified:false, bisexual:false, imgNum:231 },
  { id:"kis232", name:"Gertrude", age:20, county:"Kisii", town:"Kisii Town", tags:["sex","Raw BJ"], interests:[10,20,28,1], height:`5'10"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:232 },
  { id:"kis233", name:"Sera", age:23, county:"Kisii", town:"Ogembo", tags:["sex","Raw BJ"], interests:[21,8,19,11], height:`5'11"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:233 },
  { id:"kis234", name:"Winnie", age:33, county:"Kisii", town:"Keroka", tags:["sex","Raw BJ"], interests:[30,9,3,10], height:`5'4"`, lookingFor:"Travel partner & Hookup", isNew:true, verified:true, bisexual:false, imgNum:234 },
  { id:"kis235", name:"Janet", age:21, county:"Kisii", town:"Nyamache", tags:["sex","Raw BJ"], interests:[2,19,3,7], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:235 },
  { id:"kis236", name:"Vera", age:30, county:"Kisii", town:"Suneka", tags:["sex","Raw BJ"], interests:[27,28,18,4], height:`5'10"`, lookingFor:"Hookup", isNew:false, verified:true, bisexual:false, imgNum:236 },
  { id:"emb237", name:"Judith", age:30, county:"Embu", town:"Embu Town", tags:["sex","Raw BJ"], interests:[11,16,8,28], height:`5'3"`, lookingFor:"Relationship", isNew:true, verified:true, bisexual:false, imgNum:237 },
  { id:"emb238", name:"Wes", age:20, county:"Embu", town:"Runyenjes", tags:["sex","Raw BJ"], interests:[8,17,12,26], height:`5'3"`, lookingFor:"Intellectual partner", isNew:false, verified:true, bisexual:false, imgNum:238 },
  { id:"emb239", name:"Wren", age:23, county:"Embu", town:"Ena", tags:["sex","Raw BJ"], interests:[3,11,16,14], height:`5'7"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:239 },
  { id:"emb240", name:"Syombi", age:30, county:"Embu", town:"Ishiara", tags:["sex","Raw BJ"], interests:[16,0,9,25], height:`5'7"`, lookingFor:"Hookup", isNew:false, verified:false, bisexual:false, imgNum:240 },
  { id:"bun241", name:"Sera", age:30, county:"Bungoma", town:"Bungoma Town", tags:["sex","Raw BJ"], interests:[5,16,4,22], height:`5'2"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:241 },
  { id:"bun242", name:"Ora", age:35, county:"Bungoma", town:"Webuye", tags:["sex","Raw BJ"], interests:[11,9,22,29], height:`5'2"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:false, bisexual:false, imgNum:242 },
  { id:"bun243", name:"Patricia", age:33, county:"Bungoma", town:"Kimilili", tags:["sex","Raw BJ"], interests:[4,20,24,25], height:`5'5"`, lookingFor:"Something real", isNew:false, verified:false, bisexual:false, imgNum:243 },
  { id:"bun244", name:"Brenda", age:24, county:"Bungoma", town:"Malakisi", tags:["sex","Raw BJ"], interests:[10,18,15,6], height:`5'3"`, lookingFor:"Calm & present partner", isNew:false, verified:false, bisexual:false, imgNum:244 },
  { id:"vih245", name:"Rachel", age:35, county:"Vihiga", town:"Vihiga Town", tags:["sex","Raw BJ"], interests:[13,21,16,1], height:`5'8"`, lookingFor:"Adventure partner", isNew:false, verified:false, bisexual:false, imgNum:245 },
  { id:"vih246", name:"Amani", age:24, county:"Vihiga", town:"Mbale", tags:["sex","Raw BJ"], interests:[11,7,29,0], height:`5'3"`, lookingFor:"Relationship", isNew:true, verified:true, bisexual:false, imgNum:246 },
  { id:"vih247", name:"Deborah", age:34, county:"Vihiga", town:"Hamisi", tags:["sex","Raw BJ"], interests:[30,17,11,19], height:`5'2"`, lookingFor:"Travel partner & Hookup", isNew:false, verified:true, bisexual:false, imgNum:247 },
  { id:"vih248", name:"Dama", age:30, county:"Vihiga", town:"Luanda", tags:["sex","Raw BJ"], interests:[25,10,1,24], height:`5'10"`, lookingFor:"Grounded partner", isNew:true, verified:false, bisexual:false, imgNum:248 },
  { id:"tra249", name:"Julia", age:21, county:"Trans Nzoia", town:"Kitale", tags:["sex","Raw BJ"], interests:[4,16,17,23], height:`5'9"`, lookingFor:"Relationship", isNew:false, verified:false, bisexual:false, imgNum:249 },
  { id:"tra250", name:"Winnie", age:20, county:"Trans Nzoia", town:"Kiminini", tags:["sex","Raw BJ"], interests:[23,14,13,19], height:`5'6"`, lookingFor:"Life partner", isNew:false, verified:true, bisexual:false, imgNum:250 },
];

const PROFILES = PROFILES_RAW.map(p => ({
  ...p,
  interestLabels: p.interests.map(i => ALL_INTERESTS[i] || ALL_INTERESTS[0]),
}));

const COUNTIES = [
  "All Counties","Nairobi","Mombasa","Kisumu","Nakuru","Kiambu",
  "Machakos","Kajiado","Uasin Gishu","Meru","Nyeri","Kakamega",
  "Kilifi","Kwale","Laikipia","Muranga","Kirinyaga","Siaya","Homa Bay",
  "Kisii","Embu","Bungoma","Vihiga","Trans Nzoia",
];

const SMARTPAY_ENDPOINT = "https://starlink-backend-yb3n.onrender.com/api/runPrompt";

function imgSrc(n: number): string {
  return `/1 (${n}).jpg`;
}function initials(n: string): string {
  return n.slice(0,2).toUpperCase();
}

const AVATAR_COLORS = [
  "#2a1a4e","#1a3a5c","#1e3a24","#3a1a2c","#1e2a4e",
  "#3c2010","#142840","#263010","#361850","#142438",
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#120d22;color:#f0ecff;font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:#2e2650;border-radius:4px}
input,select,option{font-family:'Plus Jakarta Sans',sans-serif;color:#f0ecff}
option{background:#1a1530}
input::placeholder{color:#6b5fa0}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(min-width:540px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:900px){.grid{grid-template-columns:repeat(4,1fr)}}
@media(min-width:1200px){.grid{grid-template-columns:repeat(5,1fr)}}
.dash{display:flex;gap:20px;padding:20px;max-width:1400px;margin:0 auto;align-items:flex-start}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:64px;background:#1a1530;border:1px solid #2e2650;border-radius:20px;padding:18px;height:fit-content}
@media(max-width:767px){.sidebar{display:none}}
.maincol{flex:1;min-width:0}
.card{background:#1a1530;border:1px solid #2e2650;border-radius:16px;overflow:hidden;cursor:pointer;transition:border-color .22s,transform .22s,box-shadow .22s;display:block;width:100%;text-align:left}
.card:hover{border-color:#7c3aed;transform:translateY(-3px);box-shadow:0 16px 36px -10px rgba(124,58,237,0.4)}
.pill{border-radius:99px;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:0.04em}
.modal-bg{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,0.85);display:flex;align-items:flex-end;justify-content:center}
@media(min-width:600px){.modal-bg{align-items:center;padding:20px}}
.modal{background:#1a1530;border:1px solid #2e2650;border-radius:24px 24px 0 0;width:100%;max-width:500px;max-height:93vh;overflow-y:auto}
@media(min-width:600px){.modal{border-radius:22px}}
.inp{width:100%;background:#211c3a;border:1px solid #2e2650;border-radius:10px;padding:10px 14px;font-size:14px;outline:none;transition:border-color .2s;color:#f0ecff}
.inp:focus{border-color:#7c3aed}
.num-inp{width:68px;background:#211c3a;border:1px solid #2e2650;border-radius:8px;padding:8px 10px;font-size:13px;outline:none;text-align:center;color:#f0ecff}
.num-inp:focus{border-color:#7c3aed}
.chip{border-radius:99px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid #2e2650;background:#1a1530;color:#8070b0}
.chip.on{border-color:#7c3aed;background:rgba(124,58,237,0.18);color:#c084fc}
.tag{border-radius:99px;border:1px solid #2e2650;background:#211c3a;padding:4px 12px;font-size:11px;color:#9080c0}
.btn-primary{width:100%;padding:14px;border-radius:14px;border:none;cursor:pointer;font-size:15px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;transition:opacity .2s,transform .1s}
.btn-primary:hover{opacity:.9;transform:translateY(-1px)}
.btn-ghost{width:100%;padding:12px;border-radius:12px;border:1px solid #2e2650;background:#1a1530;color:#8070b0;cursor:pointer;font-size:13px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;transition:border-color .2s,color .2s;display:flex;align-items:center;justify-content:center;gap:8px}
.btn-ghost:hover{border-color:#7c3aed;color:#c084fc}
.pay-card{border-radius:16px;background:rgba(37,99,235,0.1);border:1px solid rgba(99,102,241,0.4);padding:20px;display:flex;flex-direction:column;gap:15px}
.pay-btn{width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#1d4ed8,#4f46e5);color:#fff;font-size:15px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity .2s}
.pay-btn:hover{opacity:.88}
.reveal-box{border-radius:16px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.4);padding:22px;text-align:center}
.loader{display:inline-block;border:2px solid rgba(255,255,255,0.2);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.stat-box{border-radius:12px;background:#211c3a;border:1px solid #2e2650;padding:12px 8px;text-align:center}
`;

function PImage({
  p,
  size = "card",
}: {
  p: any;
  size?: "card" | string;
}) {
  const [err, setErr] = useState(false);
  const bg = AVATAR_COLORS[p.imgNum % AVATAR_COLORS.length];
  if (err) return (
    <div style={{ width:"100%",height:"100%",background:bg,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <span style={{ fontSize:size==="modal"?"3rem":"1.8rem",fontWeight:800,color:"rgba(255,255,255,0.35)" }}>{initials(p.name)}</span>
    </div>
  );
  return <img src={imgSrc(p.imgNum)} alt={p.name} onError={()=>setErr(true)} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />;
}

function Card({
  p,
  onClick,
}: {
  p: any;
  onClick: () => void;
}) {
  return (
    <button className="card" onClick={onClick}>
      <div style={{ position:"relative",aspectRatio:"3/4",overflow:"hidden" }}>
        <PImage p={p} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(18,13,34,0.98) 0%,rgba(18,13,34,0.1) 52%,transparent 100%)",pointerEvents:"none" }} />
        {p.isNew && <span className="pill" style={{ position:"absolute",top:8,left:8,background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff" }}>NEW</span>}
        {p.bisexual && <span className="pill" style={{ position:"absolute",top:8,right:8,background:"rgba(236,72,153,0.25)",color:"#fda4af",border:"1px solid rgba(236,72,153,0.45)" }}>BI</span>}
        {!p.bisexual && p.verified && <span style={{ position:"absolute",top:8,right:8,background:"rgba(37,99,235,0.35)",borderRadius:99,padding:"3px 9px",fontSize:10,color:"#93c5fd",border:"1px solid rgba(99,102,241,0.4)",fontWeight:700 }}>✓</span>}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"10px 11px 10px" }}>
          <div style={{ display:"flex",alignItems:"baseline",justifyContent:"space-between" }}>
            <span style={{ fontWeight:800,fontSize:"0.88rem",color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"72%" }}>{p.name}</span>
            <span style={{ fontSize:"0.75rem",color:"#d4b8ff",fontWeight:700,flexShrink:0 }}>{p.age}</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:3,marginTop:2 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#7060a0" strokeWidth="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontSize:10,color:"#7060a0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{p.town}</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"7px 9px 10px",display:"flex",flexWrap:"wrap",gap:3 }}>
        {p.interestLabels.slice(0,2).map(t=><span key={t} className="tag" style={{ fontSize:9,padding:"3px 9px" }}>{t}</span>)}
        {p.interestLabels.length>2 && <span className="tag" style={{ fontSize:9,padding:"3px 9px",color:"#6050a0" }}>+{p.interestLabels.length-2}</span>}
      </div>
    </button>
  );
}

function PhoneIcon({ size=15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function PayFlow({ profile }) {
  const [step, setStep] = useState("idle");
  const [phone, setPhone] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [dots, setDots] = useState(".");
  const revealNumber = getNumber(profile.imgNum);

  useEffect(() => {
    if (step !== "waiting") return;
    const t = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 600);
    return () => clearInterval(t);
  }, [step]);

  const makeLocalId = () => `2MEET-${profile.id}-${Date.now()}`;

  const initiatePay = async () => {
    const clean = phone.replace(/\D/g, "");
    if (!clean.match(/^0[17]\d{8}$/)) {
      setErrMsg("Enter a valid Safaricom number e.g. 0712 345 678");
      return;
    }
    setErrMsg("");
    setStep("loading");
    try {
      const res = await fetch(SMARTPAY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: clean,
          amount: 50,
          local_id: makeLocalId(),
          transaction_desc: `2MEET – Unlock ${profile.name}'s contact`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.status === false) {
        setErrMsg(data.msg || "Payment failed. Please try again.");
        setStep("idle");
        return;
      }

       setStep("waiting");
   const checkoutId = data.checkout_request_id;

const checkPayment = setInterval(async () => {
  const res = await fetch(
    `${SMARTPAY_ENDPOINT.replace("/api/runPrompt", "")}/api/status/${checkoutId}`
  );

  const status = await res.json();

  if (
    status.success &&
    status.transaction.status === "completed"
  ) {
    clearInterval(checkPayment);
    setStep("done");
  }
}, 3000);

    } catch {
  setErrMsg("Unable to contact the payment server.");
  setStep("idle");
}
  };

  if (step === "done") return (
    <div className="reveal-box">
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:10 }}>
        <span style={{ fontSize:18 }}>✅</span>
        <span style={{ fontSize:11,color:"#6ee7b7",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700 }}>Payment confirmed</span>
      </div>
      <p style={{ fontSize:13,color:"#a8d5c2",marginBottom:8 }}>You've unlocked {profile.name}'s contact</p>
      <div style={{ fontWeight:800,fontSize:"1.8rem",color:"#fff",letterSpacing:"0.1em",marginBottom:6,padding:"10px 0" }}>
        {revealNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
      </div>
      <div style={{ display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:4 }}>
        <a href={`tel:${revealNumber}`} style={{ display:"inline-flex",alignItems:"center",gap:7,borderRadius:99,background:"rgba(16,185,129,0.2)",border:"1px solid rgba(16,185,129,0.45)",color:"#6ee7b7",fontSize:13,fontWeight:700,padding:"10px 20px",textDecoration:"none" }}>
          <PhoneIcon /> Call now
        </a>
        <a href={`https://wa.me/254${revealNumber.replace(/\D/g,"").slice(1)}`} target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:7,borderRadius:99,background:"rgba(37,211,102,0.15)",border:"1px solid rgba(37,211,102,0.4)",color:"#4ade80",fontSize:13,fontWeight:700,padding:"10px 20px",textDecoration:"none" }}>
          WhatsApp
        </a>
      </div>
    </div>
  );

  if (step === "waiting") return (
    <div className="pay-card" style={{ alignItems:"center",textAlign:"center" }}>
      <div className="loader" style={{ width:26,height:26 }} />
      <div>
        <p style={{ fontSize:15,fontWeight:700,color:"#fff",marginBottom:6 }}>Check your phone{dots}</p>
        <p style={{ fontSize:13,color:"#8070b0",lineHeight:1.7 }}>M-Pesa STK push sent to <strong style={{ color:"#93c5fd" }}>{phone}</strong>.<br />Enter your M-Pesa PIN to complete.</p>
      </div>

    </div>
  );

  if (step === "loading") return (
    <div className="pay-card" style={{ alignItems:"center",textAlign:"center",padding:"26px" }}>
      <div className="loader" style={{ width:22,height:22 }} />
      <p style={{ fontSize:13,color:"#93c5fd",marginTop:8 }}>Sending STK push{dots}</p>
    </div>
  );

  return (
    <div className="pay-card">
      <div style={{ display:"flex",alignItems:"center",gap:12 }}>
        <div style={{ width:48,height:48,borderRadius:12,overflow:"hidden",flexShrink:0,border:"1px solid #2e2650" }}>
          <PImage p={profile} />
        </div>
        <div>
          <div style={{ fontSize:11,color:"#93c5fd",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3,fontWeight:600 }}>Unlock {profile.name}'s contact</div>
          <div style={{ fontWeight:800,fontSize:"1.3rem",color:"#fff" }}>KES 50</div>
          <div style={{ fontSize:10,color:"#6050a0",marginTop:2 }}>One-time · Instant access</div>
        </div>
      </div>
      <div>
        <label style={{ fontSize:11,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",display:"block",marginBottom:7,fontWeight:600 }}>Your Safaricom number</label>
        <input
          className="inp"
          placeholder="0712 345 678"
          value={phone}
          onChange={e=>{setErrMsg("");setPhone(e.target.value.replace(/\D/g,"").slice(0,10));}}
          inputMode="numeric"
        />
        {errMsg && <p style={{ fontSize:12,color:"#f87171",marginTop:6 }}>{errMsg}</p>}
      </div>
      <button className="pay-btn" onClick={initiatePay}>
        <PhoneIcon /> Pay KES 50 via M-Pesa
      </button>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:5 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6050a0" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <p style={{ fontSize:10,color:"#6050a0" }}>Secure · M-Pesa STK push · Enter PIN on your phone</p>
      </div>
    </div>
  );
}

function Modal({ p, onClose }) {
  const [showPay, setShowPay] = useState(false);

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const allInterests = [...new Set([...p.tags, ...p.interestLabels])];

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>

        {/* Hero photo */}
        <div style={{ position:"relative",height:320,overflow:"hidden",borderRadius:"24px 24px 0 0" }}>
          <PImage p={p} size="modal" />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,21,48,1) 0%,rgba(26,21,48,0.2) 55%,transparent 100%)",pointerEvents:"none" }} />

          {/* Close button */}
          <button onClick={onClose} style={{ position:"absolute",top:14,right:14,width:34,height:34,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(18,13,34,0.75)",color:"#f0ecff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          {/* Badges */}
          <div style={{ position:"absolute",top:14,left:14,display:"flex",gap:6 }}>
            {p.isNew && <span className="pill" style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff" }}>NEW</span>}
            {p.bisexual && <span className="pill" style={{ background:"rgba(236,72,153,0.28)",color:"#fda4af",border:"1px solid rgba(236,72,153,0.5)" }}>Bisexual</span>}
            {p.verified && <span className="pill" style={{ background:"rgba(37,99,235,0.3)",color:"#93c5fd",border:"1px solid rgba(99,102,241,0.45)" }}>✓ Verified</span>}
          </div>

          {/* Name block */}
          <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"0 20px 20px" }}>
            <h2 style={{ fontWeight:800,fontSize:"1.7rem",color:"#fff",lineHeight:1,marginBottom:6 }}>
              {p.name}, <span style={{ color:"#c084fc" }}>{p.age}</span>
            </h2>
            <div style={{ display:"flex",alignItems:"center",gap:5 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8070b0" strokeWidth="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ fontSize:13,color:"#b0a0d8",fontWeight:500 }}>{p.town}, {p.county}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:"20px 20px 28px",display:"flex",flexDirection:"column",gap:18 }}>

          {/* Stats row */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
            <div className="stat-box">
              <div style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5,fontWeight:600 }}>Height</div>
              <div style={{ fontSize:14,fontWeight:700,color:"#f0ecff" }}>{p.height}</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5,fontWeight:600 }}>County</div>
              <div style={{ fontSize:13,fontWeight:700,color:"#f0ecff",lineHeight:1.3 }}>{p.county}</div>
            </div>
            <div className="stat-box">
              <div style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5,fontWeight:600 }}>Looking for</div>
              <div style={{ fontSize:11,fontWeight:700,color:"#f0ecff",lineHeight:1.3 }}>{p.lookingFor}</div>
            </div>
          </div>

          {/* Looking for highlight */}
          <div style={{ borderRadius:14,background:"rgba(124,58,237,0.12)",border:"1px solid rgba(124,58,237,0.35)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"rgba(124,58,237,0.22)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div>
              <div style={{ fontSize:10,color:"#8060b0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3,fontWeight:600 }}>She's looking for</div>
              <div style={{ fontSize:14,fontWeight:700,color:"#c084fc" }}>{p.lookingFor}</div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <div style={{ fontSize:11,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontWeight:700 }}>Interests & Vibes</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
              {allInterests.map(t => (
                <span key={t} className="tag" style={{ fontSize:12,padding:"5px 14px" }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ height:1,background:"#2e2650" }} />

          {/* Unlock CTA */}
          {!showPay ? (
            <div>
              <p style={{ fontSize:13,color:"#8070b0",textAlign:"center",marginBottom:12,lineHeight:1.6 }}>
                Interested in connecting with {p.name}?<br />Unlock her number for just <strong style={{ color:"#f0ecff" }}>KES 50</strong>.
              </p>
              <button
                className="btn-primary"
                style={{ background:"linear-gradient(135deg,#1d4ed8,#4f46e5)",color:"#fff" }}
                onClick={()=>setShowPay(true)}
              >
                <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:9 }}>
                  <PhoneIcon size={17} /> Get {p.name}'s Number — KES 50
                </span>
              </button>
            </div>
          ) : (
            <PayFlow profile={p} />
          )}

          <button className="btn-ghost">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Save to favourites
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterPanel({ f, onChange, onClose }) {
  const [loc, setLoc] = useState(f);
  const set = patch => { const n = {...loc,...patch}; setLoc(n); onChange(n); };
  const toggleInt = i => set({ interests: loc.interests.includes(i) ? loc.interests.filter(x=>x!==i) : [...loc.interests,i] });
  const reset = () => { const d={county:"All Counties",ageMin:18,ageMax:45,bisexualOnly:false,interests:[]}; setLoc(d); onChange(d); };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <span style={{ fontWeight:800,fontSize:"0.95rem",color:"#f0ecff" }}>Filters</span>
        <div style={{ display:"flex",gap:10,alignItems:"center" }}>
          <button onClick={reset} style={{ fontSize:11,color:"#8070b0",background:"none",border:"none",cursor:"pointer",textDecoration:"underline" }}>Reset all</button>
          {onClose && <button onClick={onClose} style={{ color:"#8070b0",background:"none",border:"none",cursor:"pointer" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>}
        </div>
      </div>
      <div>
        <div style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7,fontWeight:700 }}>County</div>
        <select value={loc.county} onChange={e=>set({county:e.target.value})} className="inp" style={{ padding:"9px 13px",background:"#211c3a" }}>
          {COUNTIES.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <div style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7,fontWeight:700 }}>Age range</div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <input type="number" min={18} max={60} value={loc.ageMin} onChange={e=>set({ageMin:Math.min(+e.target.value,loc.ageMax)})} className="num-inp" />
          <span style={{ color:"#6050a0",fontSize:14 }}>–</span>
          <input type="number" min={18} max={60} value={loc.ageMax} onChange={e=>set({ageMax:Math.max(+e.target.value,loc.ageMin)})} className="num-inp" />
          <span style={{ fontSize:11,color:"#6050a0" }}>yrs</span>
        </div>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <button
          onClick={()=>set({bisexualOnly:!loc.bisexualOnly})}
          style={{ width:40,height:22,borderRadius:99,border:"none",cursor:"pointer",background:loc.bisexualOnly?"#9333ea":"#2e2650",transition:"background .2s",position:"relative",flexShrink:0 }}
        >
          <span style={{ position:"absolute",top:3,left:loc.bisexualOnly?19:3,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s" }} />
        </button>
        <span style={{ fontSize:12,color:"#a090d0" }}>Bisexual women only</span>
      </div>
      <div>
        <div style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8,fontWeight:700 }}>Interests</div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
          {ALL_INTERESTS.map(i => (
            <button key={i} onClick={()=>toggleInt(i)} className={`chip${loc.interests.includes(i)?" on":""}`}>{i}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Decorative Sign In (non-functional, no errors) ───────────────────────────
function AuthOverlay({ onClose }) {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#1a1530",border:"1px solid #2e2650",borderRadius:24,padding:"30px 28px",width:"100%",maxWidth:390,display:"flex",flexDirection:"column",gap:18 }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:800,fontSize:"1.9rem",letterSpacing:"-0.5px",marginBottom:6 }}>
            <span style={{ color:"#c084fc" }}>2</span><span style={{ color:"#f0ecff" }}>MEET</span><span style={{ color:"#7c3aed" }}>.</span>
          </div>
          <p style={{ fontSize:13,color:"#8070b0",lineHeight:1.6 }}>Sign in to save favourites and get notified of new profiles near you.</p>
        </div>
        <div>
          <label style={{ fontSize:10,color:"#6050a0",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700 }}>Email address</label>
          <input placeholder="you@email.com" className="inp" type="email" readOnly style={{ cursor:"default" }} />
        </div>
        <div>
          <label style={{ fontSize:10,color:"#6050a0",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700 }}>Password</label>
          <input placeholder="••••••••" className="inp" type="password" readOnly style={{ cursor:"default" }} />
        </div>
        <button
          className="btn-primary"
          style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff" }}
          onClick={onClose}
        >
          Sign in
        </button>
        <p style={{ textAlign:"center",fontSize:12,color:"#8070b0" }}>
          New here?{" "}
          <span style={{ color:"#c084fc",fontWeight:700,cursor:"pointer" }}>Join free</span>
        </p>
        <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"#6050a0",fontSize:11,textDecoration:"underline",alignSelf:"center" }}>Skip for now</button>
      </div>
    </div>
  );
}

function Landing({ onEnter }) {
  const shots = [1,5,11,16,22,28,33,40,48,55,63,70,78,85,91,100,110,120,130,140];
  return (
    <div style={{ background:"#120d22",minHeight:"100vh" }}>
      <nav style={{ padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:40,background:"rgba(18,13,34,0.97)",borderBottom:"1px solid #2e2650",backdropFilter:"blur(14px)" }}>
        <span style={{ fontWeight:800,fontSize:"1.4rem",letterSpacing:"-0.5px" }}>
          <span style={{ color:"#c084fc" }}>2</span><span style={{ color:"#f0ecff" }}>MEET</span><span style={{ color:"#7c3aed" }}>.</span>
        </span>
        <button onClick={onEnter} style={{ padding:"9px 22px",borderRadius:99,background:"linear-gradient(135deg,#7c3aed,#a855f7)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer" }}>Browse Profiles</button>
      </nav>
      <section style={{ padding:"72px 24px 48px",textAlign:"center",maxWidth:640,margin:"0 auto" }}>
        <div style={{ display:"inline-block",borderRadius:99,background:"rgba(124,58,237,0.16)",border:"1px solid rgba(124,58,237,0.38)",padding:"5px 16px",fontSize:11,color:"#c084fc",marginBottom:22,fontWeight:700,letterSpacing:"0.05em" }}>
          🇰🇪 Kenya's dating platform
        </div>
        <h1 style={{ fontWeight:800,fontSize:"clamp(2rem,6vw,3.4rem)",lineHeight:1.08,color:"#f0ecff",marginBottom:16 }}>
          Real Kenyan women,<br /><span style={{ color:"#c084fc" }}>real connections</span>
        </h1>
        <p style={{ fontSize:"0.96rem",color:"#8070b0",lineHeight:1.85,maxWidth:440,margin:"0 auto 38px" }}>
          250 verified women across 24 counties. No bots, no fake profiles.
        </p>
        <button
          onClick={onEnter}
          style={{ padding:"16px 56px",borderRadius:24,background:"#ef4444",border:"2px solid #dc2626",color:"#fff",fontSize:"1rem",fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(239,68,68,0.35)" }}
          onMouseEnter={e=>e.currentTarget.style.background="#dc2626"}
          onMouseLeave={e=>e.currentTarget.style.background="#ef4444"}
        >
          I am 18+ — Enter
        </button>
        <p style={{ fontSize:10,color:"#6050a0",marginTop:10 }}>By entering you confirm you are 18 years or older</p>
      </section>
      <section style={{ padding:"0 18px 56px",maxWidth:1000,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6 }}>
          {shots.map(n=>(
            <div key={n} style={{ borderRadius:14,overflow:"hidden",aspectRatio:"3/4",background:"#1a1530",border:"1px solid #2e2650",position:"relative" }}>
              <img src={imgSrc(n)} alt="" onError={e=>{e.currentTarget.style.display = "none";}} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(18,13,34,0.5) 0%,transparent 55%)",pointerEvents:"none" }} />
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding:"0 24px 60px",maxWidth:600,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10 }}>
          {[{n:"250+",l:"Real profiles"},{n:"24",l:"Counties"},{n:"100%",l:"Kenyan women"}].map(s=>(
            <div key={s.l} style={{ borderRadius:16,background:"#1a1530",border:"1px solid #2e2650",padding:"20px 10px",textAlign:"center" }}>
              <div style={{ fontWeight:800,fontSize:"1.8rem",color:"#c084fc",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:11,color:"#8070b0",marginTop:5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding:"0 24px 72px",maxWidth:600,margin:"0 auto",textAlign:"center" }}>
        <div style={{ borderRadius:22,background:"linear-gradient(135deg,rgba(124,58,237,0.18),rgba(168,85,247,0.08))",border:"1px solid rgba(124,58,237,0.32)",padding:"42px 24px" }}>
          <h2 style={{ fontWeight:800,fontSize:"1.3rem",color:"#f0ecff",marginBottom:10 }}>Ready to make a connection?</h2>
          <p style={{ fontSize:"0.85rem",color:"#8070b0",marginBottom:24 }}>Join thousands of Kenyans making real connections every day.</p>
          <button onClick={onEnter} style={{ padding:"13px 40px",borderRadius:18,background:"linear-gradient(135deg,#7c3aed,#a855f7)",border:"none",color:"#fff",fontSize:"0.95rem",fontWeight:700,cursor:"pointer" }}>Get started free</button>
        </div>
      </section>
      <footer style={{ borderTop:"1px solid #2e2650",padding:22,textAlign:"center" }}>
        <span style={{ fontWeight:800,fontSize:"1.05rem" }}><span style={{ color:"#c084fc" }}>2</span><span style={{ color:"#f0ecff" }}>MEET</span><span style={{ color:"#7c3aed" }}>.</span></span>
        <p style={{ fontSize:10,color:"#6050a0",marginTop:7 }}>© 2026 2MEET. Made with love in Kenya. 18+ only.</p>
      </footer>
    </div>
  );
}

function Dashboard({ onShowAuth }) {
  const [filt, setFilt] = useState({ county:"All Counties",ageMin:18,ageMax:45,bisexualOnly:false,interests:[] });
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 40;

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => { setPage(1); }, [filt, q]);

  const list = useMemo(() => {
    const sq = q.trim().toLowerCase();
    return PROFILES.filter(p => {
      const cOk = filt.county === "All Counties" || p.county === filt.county;
      const aOk = p.age >= filt.ageMin && p.age <= filt.ageMax;
      const biOk = !filt.bisexualOnly || p.bisexual;
      const iOk = filt.interests.length === 0 || filt.interests.some(i => p.tags.includes(i) || p.interestLabels.includes(i));
      const sOk = !sq || p.name.toLowerCase().includes(sq) || p.town.toLowerCase().includes(sq) || p.county.toLowerCase().includes(sq);
      return cOk && aOk && biOk && iOk && sOk;
    });
  }, [filt, q]);

  const totalPages = Math.ceil(list.length / PER_PAGE);
  const visible = list.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const hasActive = filt.county !== "All Counties" || filt.bisexualOnly || filt.interests.length > 0;

  return (
    <div style={{ background:"#120d22",minHeight:"100vh" }}>
      <header style={{ position:"sticky",top:0,zIndex:50,background:"rgba(18,13,34,0.98)",borderBottom:"1px solid #2e2650",backdropFilter:"blur(16px)",padding:"10px 18px",display:"flex",alignItems:"center",gap:10 }}>
        <span style={{ fontWeight:800,fontSize:"1.22rem",letterSpacing:"-0.5px",flexShrink:0 }}>
          <span style={{ color:"#c084fc" }}>2</span><span style={{ color:"#f0ecff" }}>MEET</span><span style={{ color:"#7c3aed" }}>.</span>
        </span>
        <div style={{ flex:1,maxWidth:440,display:"flex",alignItems:"center",gap:8,background:"#1a1530",border:"1px solid #2e2650",borderRadius:24,padding:"8px 14px" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6050a0" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search name, town, county…"
            style={{ flex:1,background:"transparent",border:"none",outline:"none",fontSize:13,color:"#f0ecff" }}
          />
          {q && <button onClick={()=>setQ("")} style={{ color:"#6050a0",background:"none",border:"none",cursor:"pointer",fontSize:15 }}>✕</button>}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:7,marginLeft:"auto" }}>
          {isMobile && (
            <button onClick={()=>setMobileFilter(true)} style={{ padding:"7px 12px",borderRadius:99,background:"transparent",border:`1px solid ${hasActive?"#7c3aed":"#2e2650"}`,color:hasActive?"#c084fc":"#8070b0",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
              ⚙ Filters {hasActive && <span style={{ width:6,height:6,borderRadius:"50%",background:"#a855f7",display:"inline-block" }} />}
            </button>
          )}
          <button onClick={onShowAuth} style={{ padding:"7px 16px",borderRadius:99,background:"linear-gradient(135deg,#7c3aed,#a855f7)",border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer" }}>Sign in</button>
        </div>
      </header>

      <div className="dash">
        {!isMobile && (
          <aside className="sidebar">
<FilterPanel
  f={filt}
  onChange={setFilt}
  onClose={() => {}}
/>          </aside>
        )}
        <main className="maincol">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 }}>
            <span style={{ fontSize:10,color:"#6050a0",textTransform:"uppercase",letterSpacing:"0.09em",fontWeight:700 }}>
              {filt.bisexualOnly ? "Bisexual women" : "Women near you"}
            </span>
            <span style={{ fontSize:12,fontWeight:700,background:"rgba(124,58,237,0.15)",color:"#c084fc",borderRadius:99,padding:"4px 12px",border:"1px solid rgba(124,58,237,0.32)" }}>
              {list.length} profiles
            </span>
          </div>
          {list.length === 0 ? (
            <div style={{ textAlign:"center",padding:"70px 20px",color:"#6050a0" }}>
              <div style={{ fontSize:"2.5rem",marginBottom:12 }}>🔍</div>
              <p style={{ fontSize:14 }}>No profiles match your filters</p>
            </div>
          ) : (
            <>
              <div className="grid">
                {visible.map(p=><Card key={p.id} p={p} onClick={()=>setSelected(p)} />)}
              </div>
              {totalPages > 1 && (
                <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:28,flexWrap:"wrap" }}>
                  <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                    style={{ padding:"8px 16px",borderRadius:10,border:"1px solid #2e2650",background:"#1a1530",color:page===1?"#3a3060":"#a090d0",cursor:page===1?"default":"pointer",fontSize:12,fontWeight:600 }}>
                    ← Prev
                  </button>
                  {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                    <button key={n} onClick={()=>setPage(n)}
                      style={{ width:34,height:34,borderRadius:8,border:`1px solid ${n===page?"#7c3aed":"#2e2650"}`,background:n===page?"rgba(124,58,237,0.22)":"#1a1530",color:n===page?"#c084fc":"#8070b0",cursor:"pointer",fontSize:12,fontWeight:700 }}>
                      {n}
                    </button>
                  ))}
                  <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
                    style={{ padding:"8px 16px",borderRadius:10,border:"1px solid #2e2650",background:"#1a1530",color:page===totalPages?"#3a3060":"#a090d0",cursor:page===totalPages?"default":"pointer",fontSize:12,fontWeight:600 }}>
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {isMobile && mobileFilter && (
        <div style={{ position:"fixed",inset:0,zIndex:100,background:"rgba(0,0,0,0.85)" }} onClick={()=>setMobileFilter(false)}>
          <div onClick={e=>e.stopPropagation()} style={{ position:"absolute",bottom:0,left:0,right:0,background:"#1a1530",border:"1px solid #2e2650",borderRadius:"22px 22px 0 0",padding:"22px 20px 50px",maxHeight:"88vh",overflowY:"auto" }}>
            <FilterPanel f={filt} onChange={setFilt} onClose={()=>setMobileFilter(false)} />
          </div>
        </div>
      )}

      {selected && <Modal p={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}

export default function Page() {
  const [view, setView] = useState("landing");
  const [showAuth, setShowAuth] = useState(false);
  return (
    <>
      <style>{CSS}</style>
      {view === "landing" && <Landing onEnter={()=>setView("dashboard")} />}
      {view === "dashboard" && (
        <>
          <Dashboard onShowAuth={()=>setShowAuth(true)} />
          {showAuth && <AuthOverlay onClose={()=>setShowAuth(false)} />}
        </>
      )}
    </>
  );
}