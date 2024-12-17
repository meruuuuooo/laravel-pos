import { useEffect, useState } from 'react';

const EditThresholdModal = ({ isOpen, onClose, inventory, onSave }) => {
    const [threshold, setThreshold] = useState('');

    useEffect(() => {
        if (isOpen && inventory) {
            setThreshold(inventory.threshold || '');
        }
    }, [isOpen, inventory]);

    const handleSave = () => {
        onSave(threshold); // Pass the updated quantity to the parent handler
        setThreshold(''); // Reset input
        onClose(); // Close the modal
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg">
                <h2 id="modal-title" className="mb-4 text-lg font-semibold">
                    Edit Threshold
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="quantity"
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            threshold
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Enter new threshold"
                        />
                        {threshold === '' && (
                            <p className="mt-2 text-sm text-red-500">
                                Threshold cannot be empty.
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setThreshold(''); // Reset input
                                onClose(); // Close modal
                            }}
                            className="mr-2 rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditThresholdModal;
