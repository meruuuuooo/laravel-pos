import { useEffect, useState } from 'react';

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (isOpen && category) {
            setName(category.name || '');
        }
    }, [isOpen, category]);

    const handleSave = () => {
        if (name.trim() === '') {
            alert('Name is required!');
            return;
        }
        onSave(name); // Pass the updated name to the parent handler
        setName(''); // Reset input
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
                    Edit Category
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Enter new category name"
                        />
                        {!name.trim() && (
                            <p className="mt-2 text-sm text-red-500">
                                Category name cannot be empty.
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setName(''); // Reset input
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

export default EditCategoryModal;
