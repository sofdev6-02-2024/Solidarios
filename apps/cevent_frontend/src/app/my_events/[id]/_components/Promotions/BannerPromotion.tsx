import { EventDetailDto } from "@/utils/interfaces/EventInterfaces";

interface BannerPromotionProps {
    eventData  : EventDetailDto;
}

const BannerPromotion = ({eventData}: BannerPromotionProps) => {
    return (
        <div>
        banner promotion
        </div>
    )
}

export default BannerPromotion;