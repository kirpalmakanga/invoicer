import { Mail, Phone, MapPin } from 'lucide-react';

export function CustomerInfo({ address, tel, email }: Customer) {
    return (
        <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2">
                <MapPin />
                <span>{address}</span>
            </p>

            <p className="flex items-center gap-2">
                <Phone />
                <a href={`tel:${tel}`}>{tel}</a>
            </p>

            <p className="flex items-center gap-2">
                <Mail />
                <a href={`mailto:${email}`}>{email}</a>
            </p>
        </div>
    );
}
