import ContentDashboard from "../../components/Layout/components/ContentDashboard/ContentDashboard";
import SideBarDashboard from "../../components/Layout/components/SideBarDashboard";
import './HomeDashboard.scss'

function HomeDashboard(){
    return(
        <div className="homeDashboard">
            <SideBarDashboard/>
            <ContentDashboard/>
        </div>
    )
}

export default HomeDashboard