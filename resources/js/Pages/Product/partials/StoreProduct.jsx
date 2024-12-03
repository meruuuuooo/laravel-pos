import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function StoreProduct({ categories }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        imageURL: '',
        name: '',
        category_id: '',
        price: '',
        quantity: '',
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const createProduct = (e) => {
        e.preventDefault();

        post(route('product.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData('imageURL', file);

            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section>
            <Head title="Create" />

            <div className="overflow-hidden bg-white p-12 shadow-sm sm:rounded-lg">
                <section className="w-3/5">
                    <header className="pb-2">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-800">
                            Create Product
                        </h2>
                        <p className="mt-1 text-sm text-gray-800 dark:text-gray-400">
                            Fill in the form below to create a new product.
                        </p>
                    </header>
                    <form onSubmit={createProduct}>
                        <div className="">
                            <div className="py-3">
                                <InputLabel
                                    htmlFor="imageURL"
                                    value="imageURL"
                                />

                                <TextInput
                                    id="imageURL"
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        handleImageChange(e);
                                    }}
                                    type="file"
                                    autoComplete="imageURL"
                                />
                                <div className="border-gray-500 p-4">
                                    {previewUrl && (
                                        <img
                                            src={previewUrl}
                                            alt="profile-picture"
                                            className="h-12 w-12 rounded-lg object-cover"
                                        />
                                    )}
                                </div>

                                <InputError
                                    className="mt-2"
                                    message={errors.imageURL}
                                />
                            </div>
                            <div className="py-3">
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    required
                                    isFocused
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="py-3">
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Select Category"
                                />

                                <SelectInput
                                    id="category_id"
                                    value={data.category_id}
                                    className="mt-1 block w-full text-gray-900"
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                    options={categoryOptions}
                                    required
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.category_id}
                                />
                            </div>

                            <div className="py-3">
                                <InputLabel htmlFor="price" value="price" />

                                <TextInput
                                    id="price"
                                    className="mt-1 block w-full text-gray-800"
                                    type="number"
                                    value={data.price}
                                    autoComplete="price"
                                    required
                                    onChange={(e) =>
                                        setData('price', e.target.value)
                                    }
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            <div className="py-3">
                                <InputLabel
                                    htmlFor="quantity"
                                    value="quantity"
                                />

                                <TextInput
                                    id="quantity"
                                    className="mt-1 block w-full text-gray-800"
                                    type="number"
                                    value={data.quantity}
                                    autoComplete="quantity"
                                    required
                                    onChange={(e) =>
                                        setData('quantity', e.target.value)
                                    }
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.quantity}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 py-3">
                            <PrimaryButton
                                disabled={processing}
                                className="bg-green-500 hover:bg-green-700 focus:bg-green-700 focus:ring-pink-500 active:bg-green-900"
                            >
                                Create
                            </PrimaryButton>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    );
}
