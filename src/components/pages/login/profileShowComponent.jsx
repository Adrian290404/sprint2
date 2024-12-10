import userPhoto from "../../../assets/userPhoto.png"

export const ProfileShowComponent = () => {
    return <div>
        <div>
            <div></div>
            <div>
                <img src={userPhoto} />
                <h2>Name</h2>
                <h3>Email</h3>
            </div>
        </div>
    </div>
}