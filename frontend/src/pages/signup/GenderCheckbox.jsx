

const GenderCheckbox = ({ selectedGender, onCheckBoxChange }) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer 
                ${selectedGender === "male" ? "selected" : ""}`}
                >
                    <span className="label-text">
                        Male
                    </span>
                    <input
                        type="checkbox"
                        placeholder="Enter Confirm Password"
                        className="checkbox border-slate-900"
                        value="male"
                        checked={selectedGender === "male"}
                        onChange={(e) => onCheckBoxChange(e.target.value)}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer 
                ${selectedGender === "famale" ? "selected" : ""}`}
                >
                    <span className="label-text">
                        Famale
                    </span>
                    <input
                        type="checkbox"
                        placeholder="Enter Confirm Password"
                        className="checkbox border-slate-900"
                        value="famale"
                        checked={selectedGender === "famale"}
                        onChange={(e) => onCheckBoxChange(e.target.value)}
                    />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox