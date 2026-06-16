import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function Search() {

    return (
        <div className="flex justify-center items-center pt-0.5 pb-2">
            <TextField.Root placeholder="Search" className="w-11/12">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="18" width="18" />
                </TextField.Slot>
            </TextField.Root>
        </div>
    );
}