

const GenderCheckbox = () => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className="label gap-2 cursor-pointer">
                    <span className="label-text">
                        Male
                    </span>
                </label>
                <input
                    type="checkbox"
                    placeholder="Enter Confirm Password"
                    className="checkbox border-slate-900"
                />
            </div>
            <div className="form-control">
                <label className="label gap-2 cursor-pointer">
                    <span className="label-text">
                        Famale
                    </span>
                </label>
                <input
                    type="checkbox"
                    placeholder="Enter Confirm Password"
                    className="checkbox border-slate-900"
                />
            </div>

        </div>
    )
}

export default GenderCheckbox