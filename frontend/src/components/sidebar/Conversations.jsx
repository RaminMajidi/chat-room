import { Suspense } from "react";
import useGetConversation from "../../hooks/useGetConversation"
import { getRandomEmoji } from "../../utils/emojis";
import SpinnerLoading from "../custom/SpinnerLoading";
import Conversation from "./Conversation"

const Conversations = () => {
    const { loading, conversations } = useGetConversation();
    return (
        <div className="py-2 flex flex-col overflow-auto">
            {loading ? <SpinnerLoading /> : null}
            {conversations?.map((item, idx) => (
                <Suspense key={item._id} fallback={<SpinnerLoading />}>
                    <Conversation
                        
                        conversation={item}
                        emoji={getRandomEmoji()}
                        lastIdx={idx === conversations.length - 1}
                    />
                </Suspense>

            ))}
        </div>
    )
}

export default Conversations