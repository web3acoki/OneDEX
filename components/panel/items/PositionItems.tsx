import React from "react"
import { useEmbeddedEthereumWallet } from "@privy-io/expo"
import { PositionItem } from "@/components/content/item/PositionItem"
import { fetchPositionItems, getPositionItems } from "@/services/hyperliquid"

export function PositionItems() {
  const { wallets } = useEmbeddedEthereumWallet()
  const walletAddress = wallets[0]?.address ?? ""
  const [items, setItems] = React.useState(() => getPositionItems(walletAddress))

  React.useEffect(() => {
    if (!walletAddress) return
    void fetchPositionItems(walletAddress).then((next) => setItems(next))
  }, [walletAddress])

  if (!items.length) return null

  return <>
    {items.map((item, index) => <PositionItem key={`${item.symbol}-${item.entryPriceText}`} item={item} isFirst={index === 0} />)}
  </>
}

