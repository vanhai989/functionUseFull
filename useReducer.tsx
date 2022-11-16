{\rtf1\ansi\ansicpg1252\cocoartf2706
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red154\green154\blue154;}
{\*\expandedcolortbl;;\csgray\c66667;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab560

\itap1\trowd \taflags1 \trgaph108\trleft-108 \trbrdrt\brdrnil \trbrdrl\brdrnil \trbrdrt\brdrnil \trbrdrr\brdrnil 
\clvertalt \clshdrawnil \clbrdrt\brdrs\brdrw20\brdrcf2 \clbrdrl\brdrs\brdrw20\brdrcf2 \clbrdrb\brdrs\brdrw20\brdrcf2 \clbrdrr\brdrs\brdrw20\brdrcf2 \clpadt20 \clpadl100 \clpadb20 \clpadr100 \gaph\cellx4320
\clmrg \clvertalt \clshdrawnil \clbrdrt\brdrs\brdrw20\brdrcf2 \clbrdrl\brdrs\brdrw20\brdrcf2 \clbrdrb\brdrs\brdrw20\brdrcf2 \clbrdrr\brdrs\brdrw20\brdrcf2 \clpadt20 \clpadl100 \clpadb20 \clpadr100 \gaph\cellx8640
\pard\intbl\itap1\pardeftab560\slleading20\partightenfactor0

\f0\fs26 \cf0 const cars = [\{ make: 'audi', model: 'r8', year: '2012' \}, \{ make: 'audi', model: 'rs5', year: '2013' \}, \{ make: 'ford', model: 'mustang', year: '2012' \}, \{ make: 'ford', model: 'fusion', year: '2015' \}, \{ make: 'kia', model: 'optima', year: '2012' \}], result = cars.reduce(function (r, a) \{ r[a.make] = r[a.make] || []; r[a.make].push(a); return r; \}, []); console.log(result);\cell 
\pard\intbl\itap1\cell \lastrow\row}