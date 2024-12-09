import { Background } from "../components/common/styles/layoutStyles"
import { KpiComponent } from "../components/pages/dashboard/kpiComponent"
import { LatestReviewComponent } from "../components/pages/dashboard/latestReviewComponent"

export const DashBoardPage = () => {
    return <Background>
        <KpiComponent />
        <LatestReviewComponent />
    </Background>
}