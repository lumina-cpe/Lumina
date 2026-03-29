import React, { useState } from "react"
import "../../../styles/Island02PuzzleRound.css"

export default function Island02PuzzleRound({ levelHandler })
{
    const piecesData = levelHandler.getCurrentRoundData().pieces;
    const initialOrder = levelHandler.getCurrentRoundData().initial_order;
    const correctOrder = levelHandler.getCurrentRoundData().correct_order;
    const messageData = levelHandler.getCurrentRoundData().message;

    const [placedItems, setPlacedItems] = useState(Array(correctOrder.length).fill(null))
    const [availableItems, setAvailableItems] = useState(initialOrder)
    const [isError, setIsError] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const HandlePoolClick = (cardId) =>
    {
        const firstEmptyIndex = placedItems.indexOf(null)
        
        if (firstEmptyIndex !== -1)
        {
            const newPlacedItems = [...placedItems]
            newPlacedItems[firstEmptyIndex] = cardId
            setPlacedItems(newPlacedItems)
            
            const newAvailableItems = availableItems.filter((id) => id !== cardId)
            setAvailableItems(newAvailableItems)
            
            setIsError(false)
            setIsFinished(false)
        }
    }

    const HandleSlotClick = (cardId, slotIndex) =>
    {
        if (cardId === null) 
        {
            return
        }
        
        const newPlacedItems = [...placedItems]
        newPlacedItems[slotIndex] = null
        setPlacedItems(newPlacedItems)
        
        const newAvailableItems = [...availableItems, cardId]
        setAvailableItems(newAvailableItems)
        
        setIsError(false)
        setIsFinished(false)
    }

    const HandleSubmitClick = () =>
    {
        if (isFinished)
        {
            // TODO: proceed to next round here
            return
        }

        const isCorrect = placedItems.every((id, index) => id === correctOrder[index])
        
        if (isCorrect)
        {
            setIsFinished(true)
            setIsError(false)
        }
        else
        {
            setIsError(true)
            
            setTimeout(() => 
            {
                setIsError(false)
            }, 1000)
        }
    }

    let buttonText = "Submit Code"
    if (isFinished)
        buttonText = levelHandler.isNextRoundAvailable() ? "Next Round" : "Finished"

    return (
        <div className="round-puzzle_wrapper">
            <div className="round-slots_container">
                {
                    placedItems.map((cardId, slotIndex) => 
                    {
                        const isCardValid = cardId !== null
                        const cardText = isCardValid ? piecesData[cardId] : "Empty Slot"
                        const slotClass = isCardValid ? "round-puzzle_card" : "round-slot_empty"
                        const errorClass = isError ? "round-error_effect" : ""
                        const combinedClass = `${slotClass} ${errorClass}`
                        
                        return (
                            <div 
                                key={isCardValid ? `card-${cardId}` : `empty-${slotIndex}`} 
                                className={combinedClass}
                                onClick={() => 
                                {
                                    HandleSlotClick(cardId, slotIndex)
                                }}
                            >
                                <pre className="round-card_pre">
                                    {cardText}
                                </pre>
                            </div>
                        )
                    })
                }
            </div>

            <div className="round-pool_container">
                <div className="round-cards_grid">
                    {
                        availableItems.map((cardId) => 
                        {
                            const cardText = piecesData[cardId]
                            
                            return (
                                <div 
                                    key={`pool-${cardId}`} 
                                    className="round-puzzle_card"
                                    onClick={() => 
                                    {
                                        HandlePoolClick(cardId)
                                    }}
                                >
                                    <pre className="round-card_pre">
                                        {cardText}
                                    </pre>
                                </div>
                            )
                        })
                    }
                </div>

                <button 
                    className="round-submit_button"
                    onClick={HandleSubmitClick}
                >
                    {buttonText}
                </button>

                {
                    isFinished && (
                        <div className="round-success_panel">
                            <h3 className="round-success_title">
                                {">> Correct! <<"}
                            </h3>
                            <p className="round-success_message">
                                {messageData}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}