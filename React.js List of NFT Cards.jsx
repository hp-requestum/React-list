{\rtf1\ansi\ansicpg1252\cocoartf2707
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Monaco;}
{\colortbl;\red255\green255\blue255;\red22\green21\blue22;\red22\green21\blue22;}
{\*\expandedcolortbl;;\cssrgb\c11373\c10980\c11373;\cssrgb\c11373\c10980\c11373\c3922;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import type \{ NFTItemData \} from "@types";\
import \{ ThunkCreator \} from "easy-peasy";\
import \{ useInView \} from "framer-motion";\
import \{ and, equals \} from "ramda";\
import \{ memo, useEffect, useRef \} from "react";\
import \{ useOnScreen \} from "src/hooks/use-on-screen";\
\
import \{ NFTCard, NftCardEnum, Spinner \} from "@components/atoms";\
\
type Props = \{\
  data: NFTItemData[];\
  cardType: NftCardEnum;\
  loading?: boolean;\
  fetchNewItemLoading?: boolean;\
  // eslint-disable-next-line @typescript-eslint/no-explicit-any\
  handleFetchMore?: ThunkCreator<void, any>;\
\};\
\
type NFTGridListProps = \{\
  data: NFTItemData[];\
  cardType: NftCardEnum;\
  measureRef: (node: Element | null) => void;\
\};\
\
const NFTGridList = (\{ cardType, data, measureRef \}: NFTGridListProps) => \{\
  return data.map((nft, index) => \{\
    if (equals(index, data.length - 3)) \{\
      return (\
        <NFTCard\
          measureRef=\{measureRef\}\
          key=\{nft.id\}\
          cardType=\{cardType\}\
          \{...nft\}\
        />\
      );\
    \}\
    return <NFTCard key=\{nft.id\} cardType=\{cardType\} \{...nft\} />;\
  \});\
\};\
\
const NFTGridListMemo = memo(NFTGridList);\
\
export const NFTGrid = (\{\
  data,\
  cardType,\
  loading,\
  fetchNewItemLoading,\
  handleFetchMore,\
\}: Props) => \{\
  const ref = useRef(null);\
  const isInView = useInView(ref);\
  const \{ measureRef, isIntersecting, observer \} = useOnScreen();\
\
  useEffect(() => \{\
    if (and(and(isIntersecting, !loading), !fetchNewItemLoading)) \{\
      handleFetchMore?.();\
    \}\
  \}, [\
    fetchNewItemLoading,\
    handleFetchMore,\
    isInView,\
    isIntersecting,\
    loading,\
    observer,\
  ]);\
\
  return (\
    <div className="grid max-h-[100%] flex-1 auto-cols-max grid-cols-6 gap-[12px] overflow-scroll overscroll-none p-[24px] pb-[calc(32px+24px)]">\
      <NFTGridListMemo\
        cardType=\{cardType\}\
        data=\{data\}\
        measureRef=\{measureRef\}\
      />\
      \{fetchNewItemLoading && (\
        <div className="grid-cols-subgrid col-span-full mt-10 grid">\
          <Spinner className="m-auto !h-fit" />\
        </div>\
      )\}\
    </div>\
  );\
\};\
}