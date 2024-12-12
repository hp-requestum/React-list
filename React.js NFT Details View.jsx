{\rtf1\ansi\ansicpg1252\cocoartf2707
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Monaco;}
{\colortbl;\red255\green255\blue255;\red22\green21\blue22;\red22\green21\blue22;}
{\*\expandedcolortbl;;\cssrgb\c11373\c10980\c11373;\cssrgb\c11373\c10980\c11373\c3922;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import \{ ApolloQueryResult \} from "@apollo/client";\
import Image from "next/image";\
import \{ useRouter \} from "next/navigation";\
import \{ isEmpty, isNil \} from "ramda";\
import \{ toast \} from "react-toastify";\
\
import ArrowLeft from "@/images/arrow-left.webp";\
import \{ SuccessToast \} from "@components/atoms";\
import \{\
  CollectionPreview,\
  NftDetailViewDetails,\
  NftDetailViewMetadata,\
  Offers,\
  Traits,\
\} from "@components/molecules";\
import \{ Exact, TokenDtoQuery \} from "@graphql/generated";\
import \{ copyText \} from "@helpers";\
\
type NftDetailViewDetailsProps = JSX.IntrinsicElements["div"] & \{\
  nftData?: TokenDtoQuery["tokenDto"];\
  refetch: (\
    variables?:\
      | Partial<\
          Exact<\{\
            tokenDtoId: string;\
          \}>\
        >\
      | undefined\
  ) => Promise<ApolloQueryResult<TokenDtoQuery>>;\
\};\
\
export const NftDetailView = (\{\
  nftData,\
  refetch,\
  ...props\
\}: NftDetailViewDetailsProps) => \{\
  const router = useRouter();\
\
  const onClickOwnerAddress = () => \{\
    copyText(nftData?.ownerAddress);\
    toast(<SuccessToast text="Text was successfully copied." />);\
  \};\
\
  const handleRefresh = async () => \{\
    await refetch();\
  \};\
\
  if (isNil(nftData)) \{\
    return <div>MOCK</div>;\
  \}\
\
  // TODO\
  const onClickGoBack = () => \{\
    if (isEmpty(document.referrer)) \{\
      // TODO change to navigate to certain collection depend on nft\
      // If user come to this page from search need to back to search\
      // If user past url and we don't know previous path back to certain collection depend on nft\
      router.push("/collection-watchlist");\
    \} else \{\
      router.push("/collection-watchlist");\
    \}\
  \};\
\
  return (\
    <div \{...props\}>\
      <div className="mb-6 flex cursor-pointer" onClick=\{onClickGoBack\}>\
        <Image width=\{20\} height=\{20\} src=\{ArrowLeft\} alt="arrow left" />\
        \{/* TODO maybe use document.referrer to this */\}\
        <p className="body1-medium ml-2 text-ui-400 dark:text-ui-500">\
          Back to Bored Ape Yacht Club\
        </p>\
      </div>\
      <div className="flex">\
        <NftDetailViewMetadata nftData=\{nftData\} />\
\
        <div className="ml-6" />\
\
        <div className="flex min-w-[650px] flex-col border-r border-ui-gray-line pr-6">\
          <NftDetailViewDetails\
            nftData=\{nftData\}\
            onClickRefetch=\{handleRefresh\}\
            onClickOwnerAddress=\{onClickOwnerAddress\}\
          />\
\
          <div className="my-6 h-[1px] w-full bg-ui-150 dark:bg-ui-800" />\
\
          <Traits />\
\
          <div className="my-6 h-[1px] w-full bg-ui-150 dark:bg-ui-800" />\
\
          <Offers />\
\
          <div className="my-6 h-[1px] w-full bg-ui-150 dark:bg-ui-800" />\
\
          <CollectionPreview collection=\{nftData.collection\} />\
        </div>\
      </div>\
    </div>\
  );\
\};\
}