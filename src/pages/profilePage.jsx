import { ProfileShowComponent } from "../components/pages/profile/profileShowComponent"

export const ProfilePage = () => {
    const colors = ["#333333", "#005f73", "#bb3e03", "#9b2226", "#3a86ff", "#52b788", "#8338ec", "#ffba08", "#6a994e", "#8d99ae"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    return <ProfileShowComponent color={color} />
}