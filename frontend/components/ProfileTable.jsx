'use client';

export default function ProfileTable({ profiles }) {
    return (
        <div className="profile-table-wrapper">
            <table className="profile-table">
                <thead>
                    <tr>
                        <th>Votre profil</th>
                        <th>Solutions à envisager</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile, index) => (
                        <tr key={index}>
                            <td>{profile.profile}</td>
                            <td>{profile.solutions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
