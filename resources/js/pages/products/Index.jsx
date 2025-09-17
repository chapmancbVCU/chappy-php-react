import React, { useMemo, useState } from "react";
import { apiGet, apiPost, useAsync } from '@chappy/utils/api';

function ProductsList({ initialPage = 1, perPage = 20, className = '' }) {
    const [page, setPage] = useState(initialPage);
    const [q, setQ] = useState('');

    const { data, loading, error } = useAsync(({ signal }) =>
        apiGet('products/list', { query: { page, per_page: perPage, q }, signal }),
    [page, perPage, q]);

    const products = data?.data ?? [];
    const meta = data?.meta ?? { page, per_page: perPage, total: 0 };
    const totalPages = Math.max(1, Math.ceil((meta.total || 0) / (meta.per_page || perPage)));

    const fmtMoney = useMemo(
        () => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }),
        []
    );
    function onSearchSubmit(e) {
        e.preventDefault();
        const nextQ = e.currentTarget.q.value.trim();
        setPage(1);
        setQ(nextQ);
    }

    function goPrev() { setPage(p => Math.max(1, p - 1)); }
    function goNext() { setPage(p => Math.min(totalPages, p + 1)); }
    return (
        <div className={`container ${className}`}>
        <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="m-0">Products</h3>
            <form className="d-flex" onSubmit={onSearchSubmit} role="search">
            <input
                className="form-control me-2"
                type="search"
                name="q"
                placeholder="Search by name…"
                defaultValue={q}
            />
            <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
        </div>

        {loading && (
            <div className="alert alert-info">Loading…</div>
        )}

        {error && (
            <div className="alert alert-danger">
            <div className="fw-bold">Failed to load products</div>
            <div className="small">{error.message}</div>
            <button className="btn btn-sm btn-outline-secondary mt-2" onClick={() => setPage(p => p)}>Retry</button>
            </div>
        )}

        {!loading && !error && products.length === 0 && (
            <div className="alert alert-warning">No products found.</div>
        )}

        {!loading && !error && products.length > 0 && (
            <div className="table-responsive">
            <table className="table table-striped align-middle">
                <thead>
                <tr>
                    <th style={{width: 80}}>ID</th>
                    <th>Name</th>
                    <th style={{width: 140}}>Price</th>
                    <th style={{width: 140}}>List</th>
                    <th style={{width: 140}}>Brand</th>
                    <th style={{width: 180}}>Created</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name ?? '—'}</td>
                    <td>{p.price != null ? fmtMoney.format(Number(p.price)) : '—'}</td>
                    <td>{p.list  != null ? fmtMoney.format(Number(p.list))  : '—'}</td>
                    <td>{p.brand_id ?? '—'}</td>
                    <td>{p.created_at ? new Date(p.created_at).toLocaleString() : '—'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {!loading && !error && (
            <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="text-muted small">
                Page {meta.page} of {totalPages} • {meta.total} total
            </div>
            <div className="btn-group">
                <button className="btn btn-outline-secondary" onClick={goPrev} disabled={meta.page <= 1}>Prev</button>
                <button className="btn btn-outline-secondary" onClick={goNext} disabled={meta.page >= totalPages}>Next</button>
            </div>
            </div>
        )}
        </div>
    );
}        
export default ProductsList;